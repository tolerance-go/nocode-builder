import { register } from "@antv/x6-react-shape";
import {
  blueMapPortConfigs,
  nodeConfigs,
  portConfigs,
} from "../../configs/configs";
import { checkDuplicateIds } from "../../utils/checkDuplicateIds";

import "./registerPortLayout";

// 检查节点配置的 id 是否重复
checkDuplicateIds(nodeConfigs);

// 检查端口配置的 id 是否重复
checkDuplicateIds(portConfigs);

checkDuplicateIds(blueMapPortConfigs);

nodeConfigs.forEach((config) => {
  register(config.shape);
});
