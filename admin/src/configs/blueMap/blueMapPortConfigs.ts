import { ConditionBlueMapPortConfig } from "@/components/blueMap/ports/ConditionBlueMapPort/config";
import { ExecBlueMapPortConfig } from "@/components/blueMap/ports/ExecBlueMapPort/config";
import { validateAndCreateConfigMap } from "@/utils/blueMap/validateAndCreateConfigMap";

export const blueMapPortConfigs = [ExecBlueMapPortConfig, ConditionBlueMapPortConfig];

export const blueMapPortConfigsByType = validateAndCreateConfigMap(
  blueMapPortConfigs,
  "type"
);
