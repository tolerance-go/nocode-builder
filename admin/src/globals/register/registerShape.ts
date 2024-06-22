import { nodeConfigs } from "@/configs/blueMap/configs";
import { register } from "@antv/x6-react-shape";

nodeConfigs.forEach((config) => {
  register(config.shape);
});
