import { DataKey } from "@/types/common";

export const createConfigMapByKey = <T>(
  configs: T[],
  key: keyof T
): Map<DataKey, T> => {
  return configs.reduce((acc, config) => {
    const keyValue = config[key] as unknown as DataKey;
    if (typeof keyValue !== "string" && typeof keyValue !== "number") {
      throw new Error(
        `The specified key '${String(key)}' does not contain a DataKey value.`
      );
    }
    acc.set(keyValue, config);
    return acc;
  }, new Map<DataKey, T>());
};
