import SettingsForm from "@/components/SettingsForm";
import stores from "@/stores";
import { ensure } from "@/utils/ensure";
import { Empty } from "antd";
import React from "react";
import { useSnapshot } from "valtio";

const ComponentSettingsForm: React.FC = () => {
  const selectedNodes = useSnapshot(stores.designs.states.selectedNodes);

  if (!selectedNodes.uniqueSelectedId) {
    return (
      <div className="flex h-[100%] flex-col justify-center">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="未选择元素" />
      </div>
    );
  }

  const selectedNodeData = stores.designs.actions.findNodeById(
    selectedNodes.uniqueSelectedId
  );

  ensure(!!selectedNodeData, "selectedNodeData 不应该不存在。");

  if (!selectedNodeData.fromWidgetId) {
    return <div></div>;
  }

  const selectedNodeFromWidget = stores.components.actions.findWidgetById(
    selectedNodeData.fromWidgetId
  );

  return (
    <div className="p-2">
      <SettingsForm settings={selectedNodeFromWidget?.settingsForm ?? []} />
    </div>
  );
};

export default ComponentSettingsForm;
