import { WidgetResponseDto } from '@/_gen/api';
import { api } from '@/globals';
import { Button, Form, Input, Modal, Table } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export interface DataManagerModalRef {
  open: () => void;
  close: () => void;
}

export const DataManagerModal = forwardRef<DataManagerModalRef>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<WidgetResponseDto[]>([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
    }));

    const fetchData = async () => {
      const widgets = await api.widgets.getWidgets();
      setData(widgets);
    };

    useEffect(() => {
      if (visible) {
        fetchData();
      }
    }, [visible]);

    const handleAdd = async () => {
      try {
        const values = await form.validateFields();
        await api.widgets.createWidget(values);
        setIsAddModalVisible(false);
        fetchData(); // 刷新表格数据
      } catch (error) {
        console.error('Failed to add widget:', error);
      }
    };

    return (
      <>
        <Modal
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
                dataIndex: 'type',
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
          />
        </Modal>

        <Modal
          open={isAddModalVisible}
          title="新增 Widget"
          onCancel={() => setIsAddModalVisible(false)}
          onOk={handleAdd}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="type"
              label="WidgetType"
              rules={[
                { required: true, message: 'Please input the widget type!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="createdAt"
              label="创建时间"
              rules={[
                { required: true, message: 'Please input the creation date!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="updatedAt"
              label="更新时间"
              rules={[
                { required: true, message: 'Please input the update date!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  },
);
