import { allNodeConfigs } from "@/configs/blueMap/configs";
import { register } from "@antv/x6-react-shape";

allNodeConfigs.forEach((config) => {
  register(config.shape);
});
