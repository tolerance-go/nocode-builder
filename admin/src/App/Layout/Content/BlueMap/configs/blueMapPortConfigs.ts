import { ExecBlueMapPortConfig } from "../components/maps/ports/ExecBlueMapPort/config";
import { validateAndCreateConfigMap } from "../utils/validateAndCreateConfigMap";

export const blueMapPortConfigs = [ExecBlueMapPortConfig];

export const blueMapPortConfigsByType = validateAndCreateConfigMap(
  blueMapPortConfigs,
  "type"
);
