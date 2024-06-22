import { SearchNodeConfig } from "../../App/Layout/Content/BlueMap/components/nodes/SearchNode/config";
import { FlowPortConfig } from "../../App/Layout/Content/BlueMap/components/ports/FlowPort/config";
import { DataPortConfig } from "../../App/Layout/Content/BlueMap/components/ports/DataPort/config";
import { BasePortConfig } from "../../App/Layout/Content/BlueMap/components/ports/BasePort/config";
import { BranchControlNodeConfigMeta } from "../../App/Layout/Content/BlueMap/components/nodes/BranchControlNode/config";
import { blueMapPortConfigs } from "./blueMapPortConfigs";
import { BaseNodeConfig } from "../../App/Layout/Content/BlueMap/components/nodes/BaseNode/config";
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
