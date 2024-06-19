export const createConfigMapByKey = <T>(
  configs: T[],
  key: keyof T
): Map<string, T> => {
  return configs.reduce((acc, config) => {
    const keyValue = config[key] as unknown as string;
    if (typeof keyValue !== "string") {
      throw new Error(
        `The specified key '${String(key)}' does not contain a string value.`
      );
    }
    acc.set(keyValue, config);
    return acc;
  }, new Map<string, T>());
};
