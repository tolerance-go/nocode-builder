import SettingsForm from "@/components/SettingsForm";
import stores from "@/stores";
import { NodeData } from "@/types";
import { ensure } from "@/utils/ensure";
import { Empty, Form } from "antd";
import React, { useLayoutEffect } from "react";
import { useSnapshot } from "valtio";

const ComponentSettingsFormCoreCore: React.FC<{
  selectedNodeData: NodeData;
  fromWidgetId: string;
}> = ({ selectedNodeData, fromWidgetId }) => {
  const [form] = Form.useForm();
  const selectedNodeFromWidget =
    stores.components.actions.findWidgetById(fromWidgetId);

  /**
   * antd 的 form 的setFieldsValue  不会触发 onValuesChange
   */
  useLayoutEffect(() => {
    form.setFieldsValue(selectedNodeData.settings);
  }, [form, selectedNodeData.settings]);

  return (
    <div className="p-2">
      <SettingsForm
        form={form}
        onChange={(values) => {
          stores.designs.actions.updateNodeSettings(
            selectedNodeData.id,
            values
          );
        }}
        settings={selectedNodeFromWidget?.settingsForm ?? []}
      />
    </div>
  );
};

const ComponentSettingsFormCore: React.FC<{
  uniqueSelectedId: string;
}> = ({ uniqueSelectedId }) => {
  const selectedNodeData =
    stores.designs.actions.findNodeById(uniqueSelectedId);

  ensure(!!selectedNodeData, "selectedNodeData 不应该不存在。");

  if (!selectedNodeData.fromWidgetId) {
    return <div></div>;
  }

  return (
    <ComponentSettingsFormCoreCore
      selectedNodeData={selectedNodeData}
      fromWidgetId={selectedNodeData.fromWidgetId}
    />
  );
};

const ComponentSettingsForm: React.FC = () => {
  const selectedNodes = useSnapshot(stores.designs.states.selectedNodes);

  if (!selectedNodes.uniqueSelectedId) {
    return (
      <div className="flex h-[100%] flex-col justify-center">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="未选择元素" />
      </div>
    );
  }

  return (
    <ComponentSettingsFormCore
      uniqueSelectedId={selectedNodes.uniqueSelectedId}
    />
  );
};

export default ComponentSettingsForm;
