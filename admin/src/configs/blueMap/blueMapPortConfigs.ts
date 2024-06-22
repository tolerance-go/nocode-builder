import { validateAndCreateConfigMap } from "@/utils/blueMap/validateAndCreateConfigMap";
import { ConditionPortConfig } from "../../App/Layout/Content/BlueMap/components/ports/ConditionPort/config";
import { ExecBlueMapPortConfig } from "../../App/Layout/Content/BlueMap/components/ports/ExecBlueMapPort/config";

export const blueMapPortConfigs = [ExecBlueMapPortConfig, ConditionPortConfig];

export const blueMapPortConfigsByType = validateAndCreateConfigMap(
  blueMapPortConfigs,
  "type"
);
