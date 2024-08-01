import useMultipleClickAway from '@/common/hooks/useMultipleClickAway';
import { api } from '@/globals';
import { css } from '@emotion/css';
import { Card, Col, Drawer, Row, Spin, Typography } from 'antd';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

// 定义抽屉的引用类型
export type WidgetDrawerRef = {
  open: () => void;
  close: () => void;
  switch: () => void;
};

// 定义数据类型
type CardData = {
  title: string;
  content?: string;
  image?: string;
};

// 使用 Axios 获取数据
const fetchData = async (): Promise<CardData[]> => {
  try {
    const widgets = await api.widgets.getWidgets();
    return widgets.map((widget) => ({
      title: widget.name,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const WidgetDrawer = forwardRef<
  WidgetDrawerRef,
  {
    widgetOpenBtnRef: React.RefObject<HTMLButtonElement>;
  }
>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // 使用 useImperativeHandle 来暴露 open 和 close 方法
  useImperativeHandle(ref, () => ({
    open: showDrawer,
    close: onClose,
    switch: () => {
      setVisible(!visible);
    },
  }));

  useMultipleClickAway([containerRef, props.widgetOpenBtnRef], () => {
    onClose();
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const fetchedData = await fetchData();
      setData(fetchedData);
      setLoading(false);
    };

    if (visible) {
      loadData();
    }
  }, [visible]);

  return (
    <Drawer
      placement="bottom"
      closable={false}
      onClose={onClose}
      open={visible}
      height={400}
      mask={false}
      getContainer={false}
      drawerRender={(drawer) => {
        return (
          <div
            ref={containerRef}
            className={css`
              height: 100%;
              overflow-y: auto;
            `}
          >
            {drawer}
          </div>
        );
      }}
    >
      <div>
        {loading ? (
          <Spin tip="加载中...">
            <div
              className={css`
                height: 400px;
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            />
          </Spin>
        ) : (
          <Row gutter={[16, 16]}>
            {data.map((item, index) => (
              <Col key={index} span={24 / 8}>
                <Card
                  size="small"
                  hoverable
                  bordered={false}
                  cover={<img alt={item.title} src={item.image} />}
                >
                  <Typography.Text strong>{item.title}</Typography.Text>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Drawer>
  );
});
