import {
  WidgetSlotAssignmentWithSlotsResponseDto,
  WidgetWithSlotsResponseDto,
} from '@/_gen/api';
import { WidgetElementTypeEnum } from '@/_gen/models';
import { api } from '@/globals';
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export interface DataManagerModalRef {
  open: () => void;
  close: () => void;
}

// 定义表单值的类型
interface FormValues {
  widgetType: WidgetElementTypeEnum[];
  slotName: string;
}

export const DataManagerModal = forwardRef<DataManagerModalRef>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<WidgetWithSlotsResponseDto[]>([]);
    const [loading, setLoading] = useState(false); // 增加加载状态
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isSlotModalVisible, setIsSlotModalVisible] = useState(false);
    const [currentWidgetId, setCurrentWidgetId] = useState<number | null>(null);
    const [form] = Form.useForm<FormValues>();
    const [slotForm] = Form.useForm<{ slotName: string }>();

    useImperativeHandle(ref, () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
    }));

    const fetchData = async () => {
      setLoading(true); // 设置加载状态为 true
      try {
        const widgets = await api.widgets.getWidgetsWithSlots();
        setData(widgets);
      } finally {
        setLoading(false); // 设置加载状态为 false
      }
    };

    useEffect(() => {
      if (visible) {
        fetchData();
      }
    }, [visible]);

    const handleAdd = async () => {
      try {
        const values = await form.validateFields();
        await api.widgets.createWidgets({
          createDtos: values.widgetType.map((type) => {
            return {
              elementType: type,
            };
          }),
        });
        setIsAddModalVisible(false);
        fetchData(); // 刷新表格数据
      } catch (error) {
        console.error('Failed to add widget:', error);
      }
    };

    const handleSelectAll = () => {
      form.setFieldsValue({ widgetType: Object.values(WidgetElementTypeEnum) });
    };

    const handleAddSlot = async () => {
      try {
        const values = await slotForm.validateFields();
        if (currentWidgetId !== null) {
          await api.widgets.addSlot({
            widgetId: currentWidgetId,
            slot: {
              name: values.slotName,
            },
          });
          setIsSlotModalVisible(false);
          fetchData(); // 刷新表格数据
        }
      } catch (error) {
        console.error('Failed to add slot:', error);
      }
    };

    const openSlotModal = (widgetId: number) => {
      setCurrentWidgetId(widgetId);
      setIsSlotModalVisible(true);
    };

    return (
      <>
        <Modal
          width={'40%'}
          open={visible}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
          footer={[
            <Button
              key="add"
              type="primary"
              onClick={() => setIsAddModalVisible(true)}
            >
              新增
            </Button>,
            <Button key="close" onClick={() => setVisible(false)}>
              关闭
            </Button>,
          ]}
        >
          <Table
            columns={[
              {
                title: 'WidgetType',
                dataIndex: 'elementType',
                key: 'type',
              },
              {
                title: 'slots',
                dataIndex: 'slots',
                key: 'slots',
                render: (slots: WidgetSlotAssignmentWithSlotsResponseDto[]) => {
                  return (
                    <div>
                      {slots?.map(({ slot }) => (
                        <div key={slot.id}>{slot.name}</div>
                      ))}
                    </div>
                  );
                },
              },
              {
                title: '创建时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
              },
              {
                title: '更新时间',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
              },
              {
                title: '操作',
                key: 'action',
                render: (_, record) => (
                  <Button onClick={() => openSlotModal(record.id)}>
                    添加 Slot
                  </Button>
                ),
              },
            ]}
            rowKey={'id'}
            dataSource={data}
            loading={loading} // 传递加载状态
          />
        </Modal>

        <Modal
          open={isAddModalVisible}
          title="新增 Widget"
          onCancel={() => setIsAddModalVisible(false)}
          onOk={handleAdd}
          footer={[
            <Button key="multiSelect" onClick={handleSelectAll}>
              一键全选
            </Button>,
            <Button key="submit" type="primary" onClick={handleAdd}>
              确定
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="widgetType"
              label="WidgetType"
              rules={[
                { required: true, message: 'Please select the widget type!' },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="请选择 Widget 类型"
              >
                {Object.values(WidgetElementTypeEnum).map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          open={isSlotModalVisible}
          title="添加 Slot"
          onCancel={() => setIsSlotModalVisible(false)}
          onOk={handleAddSlot}
        >
          <Form form={slotForm} layout="vertical">
            <Form.Item
              name="slotName"
              label="Slot 名称"
              rules={[{ required: true, message: '请输入 Slot 名称!' }]}
            >
              <Input placeholder="请输入 Slot 名称" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  },
);
