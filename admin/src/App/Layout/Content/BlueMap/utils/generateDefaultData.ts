import { ensure } from "@/utils/ensure";
import { menuGroupsByType } from "../configs/menus";
import { BlueMapNodeConfig, SearchTreeNode } from "../types";

export const generateDefaultData = (
  configs: BlueMapNodeConfig[]
): SearchTreeNode[] => {
  const groups: { [key: string]: SearchTreeNode } = {};

  configs.forEach((config) => {
    config.menu.groupType.forEach((groupType) => {
      if (!groups[groupType]) {
        const group = menuGroupsByType.get(groupType);

        ensure(group, "group 必须存在。");

        groups[groupType] = {
          title: group.title,
          key: groupType,
          selectable: false,
          children: [],
        };
      }
      groups[groupType].children?.push({
        title: config.menu.title,
        key: config.menu.key,
        configId: config.id,
      });
    });
  });

  return Object.values(groups);
};
