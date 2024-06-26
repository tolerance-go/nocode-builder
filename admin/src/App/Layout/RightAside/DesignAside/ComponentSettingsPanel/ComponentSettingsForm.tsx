import SettingsForm from "@/components/SettingsForm";
import stores from "@/stores";
import { NodeData } from "@/types";
import { DeepReadonly } from "@/utils/types";
import { Empty, Form } from "antd";
import React, { useLayoutEffect } from "react";
import { useSnapshot } from "valtio";

const ComponentSettingsFormCore: React.FC<{
  selectedNodeData: DeepReadonly<NodeData>;
}> = ({ selectedNodeData }) => {
  const [form] = Form.useForm();

  const selectedNodeFromWidget = stores.components.actions.findWidgetById(
    selectedNodeData.fromWidgetId
  );

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

const ComponentSettingsForm: React.FC = () => {
  const uniqueSelectedNodeData = useSnapshot(
    stores.designs.states.uniqueSelectedNodeData
  );

  if (!uniqueSelectedNodeData.nodeData) {
    return (
      <div className="flex h-[100%] flex-col justify-center">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="未选择元素" />
      </div>
    );
  }

  return (
    <ComponentSettingsFormCore
      selectedNodeData={uniqueSelectedNodeData.nodeData}
    />
  );
};

export default ComponentSettingsForm;
