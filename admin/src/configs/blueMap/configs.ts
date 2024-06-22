import { BaseNodeConfig } from "@/components/blueMap/nodes/BaseNode/config";
import { BranchControlNodeConfigMeta } from "@/components/blueMap/nodes/BranchControlNode/config";
import { SearchNodeConfig } from "@/components/blueMap/nodes/SearchNode/config";
import { BasePortConfig } from "@/components/blueMap/ports/BasePort/config";
import { DataPortConfig } from "@/components/blueMap/ports/DataPort/config";
import { FlowPortConfig } from "@/components/blueMap/ports/FlowPort/config";
import { blueMapPortConfigs } from "./blueMapPortConfigs";
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
