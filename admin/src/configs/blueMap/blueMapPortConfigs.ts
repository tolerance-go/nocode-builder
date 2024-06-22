import { ConditionPortConfig } from "@/components/blueMap/ports/ConditionPort/config";
import { ExecPortConfig } from "@/components/blueMap/ports/ExecPort/config";
import { validateAndCreateConfigMap } from "@/utils/blueMap/validateAndCreateConfigMap";

export const blueMapPortConfigs = [ExecPortConfig, ConditionPortConfig];

export const blueMapPortConfigsByType = validateAndCreateConfigMap(
  blueMapPortConfigs,
  "type"
);
