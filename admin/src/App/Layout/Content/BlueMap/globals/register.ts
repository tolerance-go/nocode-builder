import { register } from "@antv/x6-react-shape";
import { nodeConfigs } from "../configs/configs";

nodeConfigs.forEach((config) => {
  register(config.shape);
});
