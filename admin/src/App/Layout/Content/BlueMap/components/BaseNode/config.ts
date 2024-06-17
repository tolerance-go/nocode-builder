import { ReactShapeConfig } from "@antv/x6-react-shape";
import { BaseNode } from ".";
import { NodeConfig } from "../../types";

export const BaseNodeShape: ReactShapeConfig = {
  shape: "base-node",
  width: 300,
  height: 400,
  component: BaseNode,
};

export const BaseNodeConfig: NodeConfig = {
  id: "BaseNode",
  shape: BaseNodeShape.shape,
};
