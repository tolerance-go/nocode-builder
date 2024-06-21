import { MenuGroups, SearchTreeNode } from "../types";
import { generateDefaultData } from "../utils/generateDefaultData";
import { validateAndCreateConfigMap } from "../utils/validateAndCreateConfigMap";
import { blueMapNodeConfigs } from "./blueMapNodeConfigs";

export const menuGroups: MenuGroups = [
  {
    type: "flow-control",
    title: "控制流",
  },
];

export const menuGroupsByType = validateAndCreateConfigMap(menuGroups, "type");

// 使用这个函数生成 defaultData
export const defaultData: SearchTreeNode[] =
  generateDefaultData(blueMapNodeConfigs);
