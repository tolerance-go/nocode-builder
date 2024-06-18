import { register } from "@antv/x6-react-shape";
import { shapes } from "../configs/shapes";

Object.values(shapes).forEach((shape) => {
  register(shape);
});
