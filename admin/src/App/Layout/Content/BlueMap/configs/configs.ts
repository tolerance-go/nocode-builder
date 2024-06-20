import { BaseNodeConfig } from "../components/nodes/BaseNode/config";
import { SearchNodeConfig } from "../components/nodes/SearchNode/config";
import { ArrowPortConfig } from "../components/ports/ArrowPort/config";
import { BasePortConfig } from "../components/ports/BasePort/config";
import { BranchControlNodeConfigs } from "../maps/nodes/BranchControlNode/config";
import { ExecBlueMapPortConfig } from "../maps/ports/ExecBlueMapPort/config";
import { createConfigMapByKey } from "../utils/createConfigMapById";

export const baseNodeConfigs = [BaseNodeConfig, SearchNodeConfig];

export const blueMapNodeConfigs = [BranchControlNodeConfigs.nodeConfig];

export const basePortConfigs = [BasePortConfig, ArrowPortConfig];

export const blueMapPortConfigs = [ExecBlueMapPortConfig];

// 导出以 id 为键的对象
export const baseNodeConfigsById = createConfigMapByKey(baseNodeConfigs, "id");
export const blueMapNodeConfigsById = createConfigMapByKey(
  blueMapNodeConfigs,
  "id"
);

export const blueMapNodeConfigsByShape = createConfigMapByKey(
  blueMapNodeConfigs,
  "shapeName"
);
export const basePortConfigsById = createConfigMapByKey(basePortConfigs, "id");
export const blueMapPortConfigsByType = createConfigMapByKey(
  blueMapPortConfigs,
  "type"
);
