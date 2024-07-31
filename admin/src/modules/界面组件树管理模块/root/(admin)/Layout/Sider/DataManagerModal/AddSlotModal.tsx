import { api } from '@/globals';
import type { AutoCompleteProps } from 'antd';
import { AutoComplete, Form, Modal } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';

interface AddSlotModalProps {
  visible: boolean;
  onCancel: () => void;
  onAddSlot: (slotName: string) => Promise<void>;
}

const fetchSlotSuggestions = async (query: string) => {
  // 在这里添加获取数据的接口调用逻辑
  // 返回一个包含 { value: string } 对象的数组
  const widgetSlots = await api.widgetSlots.searchWidgetSlotsByName({
    name: query,
  });
  return widgetSlots.map((widgetSlot) => ({
    value: widgetSlot.name,
  }));
};

export const AddSlotModal: FC<AddSlotModalProps> = ({
  visible,
  onCancel,
  onAddSlot,
}) => {
  const [slotForm] = Form.useForm<{ slotName: string }>();
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const handleAddSlot = async () => {
    try {
      const values = await slotForm.validateFields();
      await onAddSlot(values.slotName);
    } catch (error) {
      console.error('Failed to add slot:', error);
    }
  };

  const handleSearch = async (searchText: string) => {
    if (searchText) {
      const suggestions = await fetchSlotSuggestions(searchText);
      setOptions(suggestions);
    } else {
      setOptions([]);
    }
  };

  return (
    <Modal
      open={visible}
      title="添加 Slot"
      onCancel={onCancel}
      onOk={handleAddSlot}
      afterClose={() => {
        slotForm.resetFields();
        setOptions([]);
      }}
    >
      <Form form={slotForm} layout="vertical">
        <Form.Item
          name="slotName"
          label="Slot 名称"
          rules={[{ required: true, message: '请输入 Slot 名称!' }]}
        >
          <AutoComplete
            options={options}
            onSearch={handleSearch}
            placeholder="请输入 Slot 名称"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
