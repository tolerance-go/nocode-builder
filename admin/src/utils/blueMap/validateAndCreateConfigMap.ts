import { DataKey } from "@/types/common";
import { checkDuplicateKeys } from "./checkDuplicateIds";
import { createConfigMapByKey } from "./createConfigMapById";

export const validateAndCreateConfigMap = <T>(
  configs: T[],
  key: keyof T
): Map<DataKey, T> => {
  // 先调用 checkDuplicateKeys
  checkDuplicateKeys(configs, key);

  // 然后调用 createConfigMapByKey
  return createConfigMapByKey(configs, key);
};
