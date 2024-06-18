import { BranchControlNodeConfigs } from "../components/maps/BranchControlNode/config";
import { BaseNodeConfig } from "../components/nodes/BaseNode/config";
import { SearchNodeConfig } from "../components/nodes/SearchNode/config";
import { ArrowPortConfig } from "../components/ports/ArrowPort/config";
import { BasePortConfig } from "../components/ports/BasePort/config";
import { createConfigMapById } from "../utils/createConfigMapById";

export const nodeConfigs = [
  BaseNodeConfig,
  SearchNodeConfig,
  BranchControlNodeConfigs.nodeConfig,
];

export const portConfigs = [BasePortConfig, ArrowPortConfig];

// 导出以 id 为键的对象
export const nodeConfigsById = createConfigMapById(nodeConfigs);
export const portConfigsById = createConfigMapById(portConfigs);
