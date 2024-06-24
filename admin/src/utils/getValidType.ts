export function getValidParam<T, D extends T>(
  searchType: string | null,
  validTypes: T[],
  defaultType: D
): T {
  if (searchType === null) {
    return defaultType;
  }
  return validTypes.includes(searchType as T) ? (searchType as T) : defaultType;
}
