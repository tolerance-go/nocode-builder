import { BaseNodeConfig } from "../components/flows/nodes/BaseNode/config";
import { SearchNodeConfig } from "../components/flows/nodes/SearchNode/config";
import { FlowPortConfig } from "../components/flows/ports/FlowPort/config";
import { AttrPortConfig } from "../components/flows/ports/AttrPort/config";
import { BasePortConfig } from "../components/flows/ports/BasePort/config";
import { BranchControlNodeConfigMeta } from "../components/maps/nodes/BranchControlNode/config";
import { validateAndCreateConfigMap } from "../utils/validateAndCreateConfigMap";
import { blueMapPortConfigs } from "./blueMapPortConfigs";

export const baseNodeConfigs = [BaseNodeConfig, SearchNodeConfig];

export const blueMapRawNodeConfigs = [BranchControlNodeConfigMeta.nodeConfig];

export const allNodeConfigs = [...baseNodeConfigs, ...blueMapRawNodeConfigs];

export const basePortConfigs = [
  BasePortConfig,
  FlowPortConfig,
  AttrPortConfig,
];

export const allPortConfigs = [...basePortConfigs, ...blueMapPortConfigs];

export const blueMapRawNodeConfigsById = validateAndCreateConfigMap(
  blueMapRawNodeConfigs,
  "id"
);

export const blueMapRawNodeConfigsByShape = validateAndCreateConfigMap(
  blueMapRawNodeConfigs,
  "shapeName"
);
