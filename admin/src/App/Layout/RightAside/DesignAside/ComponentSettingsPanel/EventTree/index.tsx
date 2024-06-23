import {
  widgetEventGroupsByType,
  widgetEvents,
  widgetEventsByType,
} from "@/configs/widgetEvent";
import stores from "@/stores";
import { ensure } from "@/utils/ensure";
import type { GetProps } from "antd";
import { Tree } from "antd";
import React from "react";
import { useSnapshot } from "valtio";
import { generateEventTreeData } from "./utils/generateEventTreeData";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const EventTree: React.FC = () => {
  const uniqueSelectedNodeData = useSnapshot(
    stores.designs.states.uniqueSelectedNodeData
  );

  if (!uniqueSelectedNodeData.nodeData) return null;

  const fromWidgetId = uniqueSelectedNodeData.nodeData.fromWidgetId;
  const widgetData = stores.components.actions.findWidgetById(fromWidgetId);

  const supportEvents =
    widgetData?.supportEvents?.map((type) => {
      const target = widgetEventsByType.get(type);
      ensure(target, "type 不合法，未找到对应配置。");
      return target;
    }) || [];

  const treeData = generateEventTreeData(
    supportEvents,
    widgetEventGroupsByType
  );

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  return (
    <div className="py-2">
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    </div>
  );
};

export default EventTree;
