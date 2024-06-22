import { ConditionPortConfig } from "@/components/blueMap/ports/ConditionPort/config";
import { ExecBlueMapPortConfig } from "@/components/blueMap/ports/ExecBlueMapPort/config";
import { validateAndCreateConfigMap } from "@/utils/blueMap/validateAndCreateConfigMap";

export const blueMapPortConfigs = [ExecBlueMapPortConfig, ConditionPortConfig];

export const blueMapPortConfigsByType = validateAndCreateConfigMap(
  blueMapPortConfigs,
  "type"
);
