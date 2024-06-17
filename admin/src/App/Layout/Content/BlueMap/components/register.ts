import { register } from "@antv/x6-react-shape";
import { shapes } from "./shapes";

Object.values(shapes).forEach((shape) => {
  register(shape);
});
