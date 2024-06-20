import { BaseNodeConfig } from "../components/nodes/BaseNode/config";
import { SearchNodeConfig } from "../components/nodes/SearchNode/config";
import { ArrowPortConfig } from "../components/ports/ArrowPort/config";
import { BasePortConfig } from "../components/ports/BasePort/config";
import { BranchControlNodeConfigs } from "../maps/nodes/BranchControlNode/config";
import { ExecBlueMapPortConfig } from "../maps/ports/ExecBlueMapPort/config";
import { validateAndCreateConfigMap } from "../utils/validateAndCreateConfigMap";

export const baseNodeConfigs = [BaseNodeConfig, SearchNodeConfig];

export const blueMapNodeConfigs = [BranchControlNodeConfigs.nodeConfig];

export const allNodeConfigs = [...baseNodeConfigs, ...blueMapNodeConfigs];

export const basePortConfigs = [BasePortConfig, ArrowPortConfig];

export const blueMapPortConfigs = [ExecBlueMapPortConfig];

export const allPortConfigs = [...basePortConfigs, ...blueMapPortConfigs];

export const blueMapNodeConfigsById = validateAndCreateConfigMap(
  blueMapNodeConfigs,
  "id"
);

export const blueMapNodeConfigsByShape = validateAndCreateConfigMap(
  blueMapNodeConfigs,
  "shapeName"
);
export const blueMapPortConfigsByType = validateAndCreateConfigMap(
  blueMapPortConfigs,
  "type"
);
