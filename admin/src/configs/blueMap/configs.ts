import { BaseNodeConfig } from "@/components/blueMap/nodes/BaseNode/config";
import { BranchControlNodeConfigMeta } from "@/components/blueMap/nodes/BranchControlNode/config";
import { EventNodeConfigMeta } from "@/components/blueMap/nodes/EventNode/config";
import { SearchNodeConfig } from "@/components/blueMap/nodes/SearchNode/config";
import { validateAndCreateConfigMap } from "@/utils/blueMap/validateAndCreateConfigMap";

export const nodeConfigs = [
  BaseNodeConfig,
  SearchNodeConfig,
  BranchControlNodeConfigMeta.nodeConfig,
  EventNodeConfigMeta.nodeConfig,
];

export const nodeConfigsById = validateAndCreateConfigMap(nodeConfigs, "id");

export const nodeConfigsByShape = validateAndCreateConfigMap(
  nodeConfigs,
  "shapeName"
);
