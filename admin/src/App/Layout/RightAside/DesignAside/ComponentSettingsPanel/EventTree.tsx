import React from "react";
import { Tree } from "antd";
import type { GetProps, TreeDataNode } from "antd";
import { useSnapshot } from "valtio";
import stores from "@/stores";
import { WidgetEventItem } from "@/types";
import { widgetEventsByType } from "@/configs/widgetEvent";
import { ensure } from "@/utils/ensure";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

// 工具方法，用于生成树结构
const generateEventTreeData = (
  supportEvents: WidgetEventItem[]
): TreeDataNode[] => {
  const eventGroups: { [key: string]: TreeDataNode } = {};

  supportEvents.forEach((event) => {
    if (!eventGroups[event.groupType]) {
      eventGroups[event.groupType] = {
        title: event.menuTitle,
        key: event.groupType,
        children: [],
      };
    }
    eventGroups[event.groupType].children!.push({
      title: event.menuTitle,
      key: event.type,
      isLeaf: true,
    });
  });

  return Object.values(eventGroups);
};

const EventTree: React.FC = () => {
  const uniqueSelectedNodeData = useSnapshot(
    stores.designs.states.uniqueSelectedNodeData
  );

  if (!uniqueSelectedNodeData.nodeData) return null;

  const fromWidgetId = uniqueSelectedNodeData.nodeData.fromWidgetId;
  const widgetData = stores.components.actions.findWidgetById(fromWidgetId);

  const treeData = generateEventTreeData(
    widgetData?.supportEvents?.map((type) => {
      const target = widgetEventsByType.get(type);
      ensure(target, "type 不合法，未找到对应配置。");

      return target;
    }) || []
  );

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
};

export default EventTree;
