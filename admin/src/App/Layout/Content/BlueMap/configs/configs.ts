import { SearchNodeConfig } from "../components/nodes/SearchNode/config";
import { FlowPortConfig } from "../components/ports/FlowPort/config";
import { DataPortConfig } from "../components/ports/DataPort/config";
import { BasePortConfig } from "../components/ports/BasePort/config";
import { BranchControlNodeConfigMeta } from "../components/nodes/BranchControlNode/config";
import { blueMapPortConfigs } from "./blueMapPortConfigs";
import { BaseNodeConfig } from "../components/nodes/BaseNode/config";
import { validateAndCreateConfigMap } from "@/utils/blueMap/validateAndCreateConfigMap";

export const baseNodeConfigs = [BaseNodeConfig, SearchNodeConfig];

export const blueMapRawNodeConfigs = [BranchControlNodeConfigMeta.nodeConfig];

export const allNodeConfigs = [...baseNodeConfigs, ...blueMapRawNodeConfigs];

export const basePortConfigs = [BasePortConfig, FlowPortConfig, DataPortConfig];

export const allPortConfigs = [...basePortConfigs, ...blueMapPortConfigs];

export const blueMapRawNodeConfigsById = validateAndCreateConfigMap(
  blueMapRawNodeConfigs,
  "id"
);

export const blueMapRawNodeConfigsByShape = validateAndCreateConfigMap(
  blueMapRawNodeConfigs,
  "shapeName"
);
