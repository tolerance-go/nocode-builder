import {
  allNodeConfigs,
  allPortConfigs,
  blueMapPortConfigs,
} from "../../configs/configs";
import { checkDuplicateKeys } from "../../utils/checkDuplicateIds";

// 检查节点配置的 id 是否重复
checkDuplicateKeys(allNodeConfigs, "shapeName");
checkDuplicateKeys(allNodeConfigs, "id");

checkDuplicateKeys(blueMapPortConfigs, "type");
checkDuplicateKeys(allPortConfigs, "id");
