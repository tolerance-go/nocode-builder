import { register } from "@antv/x6-react-shape";
import { allNodeConfigs } from "../../configs/configs";
import "./registerPortLayout";
import "./registerRouter";

allNodeConfigs.forEach((config) => {
  register(config.shape);
});
