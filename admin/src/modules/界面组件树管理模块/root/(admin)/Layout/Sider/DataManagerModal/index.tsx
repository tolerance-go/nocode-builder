import { WidgetResponseDto } from '@/_gen/api';
import { api } from '@/globals';
import { Modal, Table } from 'antd';
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

export interface DataManagerModalRef {
  open: () => void;
  close: () => void;
}

export const DataManagerModal = forwardRef<DataManagerModalRef>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<WidgetResponseDto[]>([]);

    useImperativeHandle(ref, () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
    }));

    useEffect(() => {
      if (visible) {
        // 模拟数据加载
        const fetchData = async () => {
          const widgets = await api.widgets.getWidgets();
          setData(widgets);
        };

        fetchData();
      }
    }, [visible]);

    return (
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
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
    );
  },
);
