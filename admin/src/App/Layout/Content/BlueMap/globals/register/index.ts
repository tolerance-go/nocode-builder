import { register } from "@antv/x6-react-shape";
import { baseNodeConfigs } from "../../configs/configs";
import "./registerPortLayout";
import "./registerRouter";

baseNodeConfigs.forEach((config) => {
  register(config.shape);
});
