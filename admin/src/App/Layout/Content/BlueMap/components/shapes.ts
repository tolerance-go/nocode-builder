import { ReactShapeConfig } from "@antv/x6-react-shape";
import { BaseNodeShape } from "./nodes/BaseNode/config";
import { SearchNodeShape } from "./nodes/SearchNode/config";

/**
 * shape 到组件的 map
 */
export const shapes: {
  [key: string]: ReactShapeConfig;
} = {
  [BaseNodeShape.shape]: BaseNodeShape,
  [SearchNodeShape.shape]: SearchNodeShape,
};
