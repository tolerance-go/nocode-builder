import { FlowControlNodeConfigs } from "../components/maps/nodes/FlowControlNode/config";
import { BaseNodeConfig } from "../components/nodes/BaseNode/config";
import { SearchNodeConfig } from "../components/nodes/SearchNode/config";

export const nodeConfigs = [
  BaseNodeConfig,
  SearchNodeConfig,
  FlowControlNodeConfigs.nodeConfig,
];
