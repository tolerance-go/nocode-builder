import { ReactShapeConfig } from "@antv/x6-react-shape";
import { FlowControlNodeShape } from "../components/maps/nodes/FlowControlNode/config";
import { BaseNodeShape } from "../components/nodes/BaseNode/config";
import { SearchNodeShape } from "../components/nodes/SearchNode/config";

/**
 * shape 到组件的 map
 */
export const shapes: {
  [key: string]: ReactShapeConfig;
} = {
  [BaseNodeShape.shape]: BaseNodeShape,
  [SearchNodeShape.shape]: SearchNodeShape,
  [FlowControlNodeShape.shape]: FlowControlNodeShape,
};
