export const nameof = <T>(name: keyof T) => name;

export const mapBy = <
  T,
  K extends string | number | boolean | undefined | null,
  R = T,
>(
  array: T[],
  keySelector: (item: T) => K,
  elementSelector: (item: T) => R = (item) => item as unknown as R,
): Map<K, R> => {
  return array.reduce((acc, item) => {
    acc.set(keySelector(item), elementSelector(item));
    return acc;
  }, new Map<K, R>());
};

export const groupBy = <
  T,
  K extends string | number | boolean | undefined | null,
  R = T,
>(
  array: T[],
  keySelector: (item: T) => K,
  elementSelector: (item: T) => R = (item) => item as unknown as R,
): Map<K, R[]> => {
  return array.reduce((acc, item) => {
    const key = keySelector(item);
    const arr = acc.get(key) || [];
    arr.push(elementSelector(item));
    acc.set(key, arr);
    return acc;
  }, new Map<K, R[]>());
};
