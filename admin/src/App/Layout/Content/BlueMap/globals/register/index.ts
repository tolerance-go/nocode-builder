import { register } from "@antv/x6-react-shape";
import {
  blueMapPortConfigs,
  nodeConfigs,
  portConfigs,
} from "../../configs/configs";
import { checkDuplicateKeys } from "../../utils/checkDuplicateIds";

import "./registerPortLayout";

// 检查节点配置的 id 是否重复
checkDuplicateKeys(nodeConfigs, "id");

// 检查端口配置的 id 是否重复
checkDuplicateKeys(portConfigs, "id");

checkDuplicateKeys(blueMapPortConfigs, "type");

nodeConfigs.forEach((config) => {
  register(config.shape);
});
