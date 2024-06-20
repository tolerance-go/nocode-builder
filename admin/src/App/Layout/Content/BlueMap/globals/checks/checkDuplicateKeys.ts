import {
  baseNodeConfigs,
  basePortConfigs,
  blueMapNodeConfigs,
  blueMapPortConfigs,
} from "../../configs/configs";
import { checkDuplicateKeys } from "../../utils/checkDuplicateIds";

// 检查节点配置的 id 是否重复
checkDuplicateKeys(baseNodeConfigs, "id");
checkDuplicateKeys(blueMapNodeConfigs, "id");
checkDuplicateKeys(blueMapNodeConfigs, "shapeName");
checkDuplicateKeys(basePortConfigs, "id");
checkDuplicateKeys(blueMapPortConfigs, "type");
