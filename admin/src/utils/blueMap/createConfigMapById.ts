export const createConfigMapByKey = <T>(
  configs: T[],
  key: keyof T
): Map<string | number, T> => {
  return configs.reduce((acc, config) => {
    const keyValue = config[key] as unknown as string | number;
    if (typeof keyValue !== "string" && typeof keyValue !== "number") {
      throw new Error(
        `The specified key '${String(key)}' does not contain a string | number value.`
      );
    }
    acc.set(keyValue, config);
    return acc;
  }, new Map<string | number, T>());
};
