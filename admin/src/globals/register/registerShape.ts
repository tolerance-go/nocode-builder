import { allNodeConfigs } from "@/App/Layout/Content/BlueMap/configs/configs";
import { register } from "@antv/x6-react-shape";

allNodeConfigs.forEach((config) => {
  register(config.shape);
});
