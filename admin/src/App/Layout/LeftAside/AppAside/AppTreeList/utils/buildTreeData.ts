import { AppData, AppGroup } from "@/types/common";
import { DeepReadonly } from "@/utils/types";
import { TreeDataNode } from "antd";

export const buildTreeData = (
  apps: DeepReadonly<AppData[]>,
  groups: DeepReadonly<AppGroup[]>
): TreeDataNode[] => {
  const groupMap = new Map<number, TreeDataNode>();
  const appNodes: TreeDataNode[] = [];
  const rootGroups: TreeDataNode[] = [];

  // 建立群组映射
  groups.forEach((group) => {
    groupMap.set(group.id, {
      title: group.menuTitle,
      key: group.id,
      selectable: false,
      children: [],
    });
  });

  // 处理应用数据
  apps.forEach((app) => {
    const appNode: TreeDataNode = {
      title: app.menuTitle,
      key: app.id,
      isLeaf: true,
    };
    if (app.groupId) {
      const parentGroup = groupMap.get(app.groupId);
      if (parentGroup) {
        parentGroup.children!.push(appNode);
      } else {
        appNodes.push(appNode);
      }
    } else {
      appNodes.push(appNode);
    }
  });

  // 处理嵌套群组
  groups.forEach((group) => {
    if (group.parentGroupId) {
      const parentGroup = groupMap.get(group.parentGroupId);
      const currentGroup = groupMap.get(group.id);
      if (parentGroup && currentGroup) {
        parentGroup.children!.push(currentGroup);
      }
    } else {
      rootGroups.push(groupMap.get(group.id)!);
    }
  });

  // 最终生成 treeData
  const treeData: TreeDataNode[] = [...rootGroups, ...appNodes];

  return treeData;
};
