import { BaseNodeConfig } from "../components/flows/nodes/BaseNode/config";
import { SearchNodeConfig } from "../components/flows/nodes/SearchNode/config";
import { ArrowPortConfig } from "../components/ports/ArrowPort/config";
import { BasePortConfig } from "../components/ports/BasePort/config";
import { BranchControlNodeConfigMeta } from "../maps/nodes/BranchControlNode/config";
import { validateAndCreateConfigMap } from "../utils/validateAndCreateConfigMap";
import { blueMapPortConfigs } from "./blueMapPortConfigs";

export const baseNodeConfigs = [BaseNodeConfig, SearchNodeConfig];

export const blueMapRawNodeConfigs = [BranchControlNodeConfigMeta.nodeConfig];

export const allNodeConfigs = [...baseNodeConfigs, ...blueMapRawNodeConfigs];

export const basePortConfigs = [BasePortConfig, ArrowPortConfig];

export const allPortConfigs = [...basePortConfigs, ...blueMapPortConfigs];

export const blueMapRawNodeConfigsById = validateAndCreateConfigMap(
  blueMapRawNodeConfigs,
  "id"
);

export const blueMapRawNodeConfigsByShape = validateAndCreateConfigMap(
  blueMapRawNodeConfigs,
  "shapeName"
);
