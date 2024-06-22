import { ConditionPortConfig } from "../components/ports/ConditionPort/config";
import { ExecBlueMapPortConfig } from "../components/ports/ExecBlueMapPort/config";
import { validateAndCreateConfigMap } from "../utils/validateAndCreateConfigMap";

export const blueMapPortConfigs = [ExecBlueMapPortConfig, ConditionPortConfig];

export const blueMapPortConfigsByType = validateAndCreateConfigMap(
  blueMapPortConfigs,
  "type"
);
