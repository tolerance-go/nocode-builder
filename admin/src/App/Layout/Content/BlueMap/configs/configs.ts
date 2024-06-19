import { BaseNodeConfig } from "../components/nodes/BaseNode/config";
import { SearchNodeConfig } from "../components/nodes/SearchNode/config";
import { ArrowPortConfig } from "../components/ports/ArrowPort/config";
import { BasePortConfig } from "../components/ports/BasePort/config";
import { BranchControlNodeConfigs } from "../maps/nodes/BranchControlNode/config";
import { ExecBlueMapPortConfig } from "../maps/ports/ExecBlueMapPort/config";
import { createConfigMapByKey } from "../utils/createConfigMapById";

export const nodeConfigs = [
  BaseNodeConfig,
  SearchNodeConfig,
  BranchControlNodeConfigs.nodeConfig,
];

export const portConfigs = [BasePortConfig, ArrowPortConfig];

export const blueMapPortConfigs = [ExecBlueMapPortConfig];

// 导出以 id 为键的对象
export const nodeConfigsById = createConfigMapByKey(nodeConfigs, "id");
export const portConfigsById = createConfigMapByKey(portConfigs, "id");
export const blueMapPortConfigsByType = createConfigMapByKey(
  blueMapPortConfigs,
  "type"
);
