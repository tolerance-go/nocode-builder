export const isEmpty = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return !value;
};
