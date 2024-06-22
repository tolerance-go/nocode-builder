import { ConditionPortConfig } from "../components/maps/ports/ConditionPort/config";
import { ExecBlueMapPortConfig } from "../components/maps/ports/ExecBlueMapPort/config";
import { validateAndCreateConfigMap } from "../utils/validateAndCreateConfigMap";

export const blueMapPortConfigs = [ExecBlueMapPortConfig, ConditionPortConfig];

export const blueMapPortConfigsByType = validateAndCreateConfigMap(
  blueMapPortConfigs,
  "type"
);
