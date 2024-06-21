import { ExecBlueMapPortConfig } from "../maps/ports/ExecBlueMapPort/config";
import { validateAndCreateConfigMap } from "../utils/validateAndCreateConfigMap";

export const blueMapPortConfigs = [ExecBlueMapPortConfig];

export const blueMapPortConfigsByType = validateAndCreateConfigMap(
  blueMapPortConfigs,
  "type"
);
