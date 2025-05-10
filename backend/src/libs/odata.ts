import { ODataQuery } from 'src/dto/odata.dto';
import { TypeOrmVisitor } from 'odata-v4-typeorm/build/lib/visitor';
import { createQuery } from 'odata-v4-typeorm';
import { Brackets, ObjectLiteral, SelectQueryBuilder } from 'typeorm';

const queryToOdataString = (query: Record<string, unknown>): string => {
  let result = '';
  for (const key in query) {
    if (key.startsWith('$')) {
      if (result !== '') {
        result += '&';
      }
      result += `${key}=${query[key]}`;
    }
  }
  return result;
};

export const parseOdata = (
  alias: string,
  query: ODataQuery,
): TypeOrmVisitor => {
  let odataQuery: TypeOrmVisitor | undefined;

  const replacementForQuote = '__replacementForQuote__';

  if (query) {
    if (!query.$filter?.trim()) {
      delete query.$filter;
    }
    if (query.$filter) {
      query.$filter = query.$filter.replaceAll('"', replacementForQuote);
    }

    const odataString = queryToOdataString(query);
    if (odataString) {
      odataQuery = createQuery(odataString, { alias: alias });
    }
  }

  if (!odataQuery) {
    throw new Error(`Can't build odataQuery`);
  }

  if (odataQuery?.parameters) {
    const questions = new RegExp('\\?', 'g');
    const keys = odataQuery.parameters.keys();
    const where: string = (odataQuery as any).originalWhere;
    odataQuery.where = where
      .replace(/:p\d+/g, () => `?`)
      .replace(questions, () => `:${keys.next().value}`);

    odataQuery.parameters.forEach(
      (value: any, key: string, map: Map<string, unknown>) => {
        map.set(
          key,
          typeof value === 'string' && value
            ? value.replaceAll(replacementForQuote, '"')
            : value,
        );
      },
    );
  }

  return odataQuery;
};

const mapToObject = (aMap: Map<string, unknown>) => {
  const obj: Record<string, unknown> = {};
  if (aMap) {
    aMap.forEach((v, k) => {
      obj[k] = v;
    });
  }
  return obj;
};

export const applyODataWhere = <T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  odataQuery: TypeOrmVisitor,
) => {
  if (!odataQuery?.where) return queryBuilder;

  const parameters = queryBuilder.getParameters();
  const newOdataParameters = mapToObject(odataQuery.parameters);
  Object.keys(newOdataParameters).forEach((key) => {
    parameters[key] = newOdataParameters[key];
  });
  return queryBuilder
    .andWhere(
      new Brackets((qb) => {
        return qb.where(odataQuery.where);
      }),
    )
    .setParameters(parameters);
};

export const applyODataOrder = <T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  odataQuery: TypeOrmVisitor,
) => {
  if (!odataQuery?.orderby || odataQuery?.orderby === '1') return queryBuilder;

  let builder = queryBuilder;
  const orders = odataQuery.orderby.split(',').map((i: any) => i.trim());
  orders.forEach((item: string) => {
    const splitted = item.split(' ');
    if (splitted.length > 0) {
      const sort = splitted[0];
      const order = splitted.length > 1 ? splitted[1] : undefined;
      const nulls = splitted.length > 2 ? splitted[2] : undefined;
      builder = builder.addOrderBy(sort, order as any, nulls as any);
    }
  });

  return builder;
};
