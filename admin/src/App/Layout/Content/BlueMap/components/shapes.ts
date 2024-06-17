import { ReactShapeConfig } from "@antv/x6-react-shape";
import { BaseNodeShape } from "./BaseNode/config";
import { SearchNodeShape } from "./SearchNode/config";

/**
 * shape 到组件的 map
 */
export const shapes: {
  [key: string]: ReactShapeConfig;
} = {
  [BaseNodeShape.shape]: BaseNodeShape,
  [SearchNodeShape.shape]: SearchNodeShape,
};
