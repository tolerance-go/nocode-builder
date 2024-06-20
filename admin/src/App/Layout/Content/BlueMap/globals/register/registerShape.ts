import { register } from "@antv/x6-react-shape";
import { allNodeConfigs } from "../../configs/configs";

allNodeConfigs.forEach((config) => {
  register(config.shape);
});
