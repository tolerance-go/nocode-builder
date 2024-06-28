export const shallowEqual = (obj1: unknown, obj2: unknown): boolean => {
  if (obj1 === obj2) return true;

  if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (
      !Object.prototype.hasOwnProperty.call(obj2, key) ||
      obj1[key] !== obj2[key]
    ) {
      return false;
    }
  }

  return true;
};

const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return typeof obj === "object" && obj !== null;
};
