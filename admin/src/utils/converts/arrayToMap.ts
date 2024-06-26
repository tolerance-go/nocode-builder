export function arrayToMap<T, K extends keyof T>(
  array: T[],
  key: K,
): Map<T[K], T> {
  const map = new Map<T[K], T>();
  array.forEach((item) => {
    const keyValue = item[key];
    map.set(keyValue, item);
  });
  return map;
}
