import { WidgetResponseDto } from '@/_gen/api';
import { WidgetElementTypeEnum } from '@/_gen/models';
import { api } from '@/globals';
import { Button, Form, Modal, Select, Table } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export interface DataManagerModalRef {
  open: () => void;
  close: () => void;
}

// 定义表单值的类型
interface FormValues {
  widgetType: WidgetElementTypeEnum[];
}

export const DataManagerModal = forwardRef<DataManagerModalRef>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<WidgetResponseDto[]>([]);
    const [loading, setLoading] = useState(false); // 增加加载状态
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [form] = Form.useForm<FormValues>();

    useImperativeHandle(ref, () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
    }));

    const fetchData = async () => {
      setLoading(true); // 设置加载状态为 true
      try {
        const widgets = await api.widgets.getWidgets();
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
                title: '创建时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
              },
              {
                title: '更新时间',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
              },
            ]}
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
      </>
    );
  },
);
