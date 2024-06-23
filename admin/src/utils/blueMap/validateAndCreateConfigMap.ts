import { checkDuplicateKeys } from "./checkDuplicateIds";
import { createConfigMapByKey } from "./createConfigMapById";

export const validateAndCreateConfigMap = <T>(
  configs: T[],
  key: keyof T
): Map<string | number, T> => {
  // 先调用 checkDuplicateKeys
  checkDuplicateKeys(configs, key);

  // 然后调用 createConfigMapByKey
  return createConfigMapByKey(configs, key);
};
