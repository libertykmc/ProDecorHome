import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { randomUUID } from 'crypto';
import * as moment from 'moment';
import { TypeOrmVisitor } from 'odata-v4-typeorm/build/lib/visitor';
import { IdDto, UserIdDto } from 'src/dto/common.dto';
import { ODataRequestDto, ODataQuery, Count } from 'src/dto/odata.dto';
import {
  CreateProductDto,
  ProductDto,
  ProductImageRequestDto,
} from 'src/dto/product.dto';
import { ProductQueryDto } from 'src/dto/product.query.dto';
import { groupBy, mapBy, nameof } from 'src/helper/helper';
import { MapperProduct } from 'src/libs/mapper/product.mapper';
import { applyODataOrder, applyODataWhere, parseOdata } from 'src/libs/odata';
import { FavoritesEntity } from 'src/models/favorites.entity';
import { ImageEntity } from 'src/models/image.entity';
import { ProductEntity } from 'src/models/product.entity';
import { Any, DataSource } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private get manager() {
    return this.dataSource.manager;
  }

  async getProducts(dto: ODataRequestDto & UserIdDto) {
    const alias = 'product';

    const odataQueryParams: ODataQuery = {
      $orderby: dto.$orderby || `${nameof<ProductEntity>('title')} asc`,
    };

    if (dto.$filter) {
      odataQueryParams.$filter = dto.$filter;
    }

    const odataQuery: TypeOrmVisitor | undefined = parseOdata(
      alias,
      odataQueryParams,
    );

    let queryBuilder = this.manager
      .getRepository(ProductEntity)
      .createQueryBuilder('product');

    queryBuilder = applyODataWhere(queryBuilder, odataQuery);

    const [countQuery, countParams] = queryBuilder.getQueryAndParameters();

    queryBuilder = applyODataOrder(queryBuilder, odataQuery);

    queryBuilder = queryBuilder.take(
      !dto.$top || dto.$top > 100 ? 100 : dto.$top,
    );
    queryBuilder = queryBuilder.skip(dto.$skip || 0);

    const [result, count] = await Promise.all([
      queryBuilder.getRawMany<ProductQueryDto>(),
      this.manager.query<Count[]>(
        `select count(1) from (${countQuery}) as base`,
        countParams,
      ),
    ]);

    const favorites = await this.manager.findBy(FavoritesEntity, {
      user_id: dto.user_id,
      product_id: Any(result.map((r) => r.product_id)),
    });

    const mapFavorites = mapBy(favorites, (item) => item.product_id);

    const productList = MapperProduct.toDtos(result, mapFavorites);

    return {
      list: productList,
      count: Number(count[0].count),
    };
  }

  async getProduct(dto: IdDto & { user_id: string }) {
    const productEntity = await this.manager.findOneBy(ProductEntity, {
      id: dto.id,
    });

    if (!productEntity) {
      throw new UnprocessableEntityException('Product not found');
    }

    const favorites = await this.manager.findBy(FavoritesEntity, {
      user_id: dto.id,
      product_id: productEntity.id,
    });

    const mapFavorites = mapBy(favorites, (item) => item.product_id);

    return MapperProduct.toDto(productEntity, mapFavorites);
  }

  async getProductImage(
    product_id: string,
    image_id: string,
  ): Promise<{ buffer: Buffer; etag: string }> {
    const image = await this.manager.findOneBy(ImageEntity, {
      id: image_id,
      product_id,
    });

    if (!image?.image || !image.upload_time) return;

    const etag = image.upload_time.valueOf().toString();
    this.cacheManager.set(`image_${image.product_id}_${image.id}`, etag);
    return {
      buffer: Buffer.from(image.image),
      etag,
    };
  }

  async setProductImage(dto: ProductImageRequestDto) {
    const upload_time = moment().toDate();

    await this.manager.save(ImageEntity, {
      id: randomUUID(),
      image: dto.image,
      upload_time,
    });
  }

  async createProduct(dto: CreateProductDto) {
    const existingProductEntity = await this.manager.findOneBy(ProductEntity, {
      title: dto.title,
    });

    if (existingProductEntity) throw new Error('Product entity already exists');

    const productEntity = this.manager.create(ProductEntity, {
      ...dto,
      id: randomUUID(),
    });

    await this.manager.save(productEntity);
  }

  async updateProduct(dto: ProductDto) {
    const productEntity = await this.manager.findOneBy(ProductEntity, {
      id: dto.id,
    });

    if (!productEntity) throw new Error('User entity not found');

    const updatedProduct: ProductEntity = { ...productEntity, ...dto };

    await this.manager.update(
      ProductEntity,
      {
        id: dto.id,
      },
      {
        title: updatedProduct.title,
        description: updatedProduct.description,
        price: updatedProduct.price,
        discount: updatedProduct.discount,
        type: updatedProduct.type,
        images: updatedProduct.images,
      },
    );
  }

  async deleteProduct(dto: IdDto) {
    await this.manager.delete(ProductEntity, {
      id: dto.id,
    });
  }
}
