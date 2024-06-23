import {
  widgetEventGroupsByType,
  widgetEventsByType,
} from "@/configs/widgetEvent";
import stores from "@/stores";
import { SearchParams } from "@/types";
import { ensure } from "@/utils/ensure";
import { useSearchData } from "@/utils/useSearchData";
import type { GetProps } from "antd";
import { Tree } from "antd";
import React from "react";
import { useSnapshot } from "valtio";
import { generateEventTreeData } from "./utils/generateEventTreeData";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const EventTree: React.FC = () => {
  const { searchData, updateSearchData } = useSearchData<
    Pick<SearchParams["/apps/:id/design"], "contentType" | "selectedEvent">
  >({
    contentType: "design",
    selectedEvent: "",
  });

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

  const onSelect: DirectoryTreeProps["onSelect"] = (_keys, info) => {
    if (info.node.isLeaf) {
      updateSearchData({
        contentType: "blueMap",
        selectedEvent: info.node.key as string,
      });
    } else {
      updateSearchData({
        selectedEvent: info.node.key as string,
      });
    }
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
        expandAction="doubleClick"
        treeData={treeData}
        activeKey={searchData.selectedEvent || undefined}
        selectedKeys={
          searchData.selectedEvent ? [searchData.selectedEvent] : undefined
        }
      />
    </div>
  );
};

export default EventTree;
