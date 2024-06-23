import { WidgetEventItem, WidgetEventGroupItem, DataKey } from "@/types";
import { TreeDataNode } from "antd";

// 工具方法，用于生成树结构
export const generateEventTreeData = (
  supportEvents: WidgetEventItem[],
  eventGroups: Map<DataKey, WidgetEventGroupItem>
): TreeDataNode[] => {
  const buildTree = (group: WidgetEventGroupItem): TreeDataNode => {
    const children: TreeDataNode[] = [];

    // 查找属于当前组的事件
    supportEvents.forEach((event) => {
      if (event.groupType === group.type) {
        children.push({
          title: event.menuTitle,
          key: event.type,
          isLeaf: true,
        });
      }
    });

    // 查找属于当前组的子组
    eventGroups.forEach((subGroup) => {
      if (subGroup.parentGroupType === group.type) {
        children.push(buildTree(subGroup));
      }
    });

    return {
      title: group.menuTitle,
      key: group.type,
      children,
      selectable: false,
    };
  };

  // 查找所有顶层组（没有父组）
  const roots: TreeDataNode[] = [];
  eventGroups.forEach((group) => {
    if (!group.parentGroupType) {
      roots.push(buildTree(group));
    }
  });

  return roots;
};
