import { validateAndCreateConfigMap } from "@/utils/blueMap/validateAndCreateConfigMap";
import { ConditionPortConfig } from "../components/ports/ConditionPort/config";
import { ExecBlueMapPortConfig } from "../components/ports/ExecBlueMapPort/config";

export const blueMapPortConfigs = [ExecBlueMapPortConfig, ConditionPortConfig];

export const blueMapPortConfigsByType = validateAndCreateConfigMap(
  blueMapPortConfigs,
  "type"
);
