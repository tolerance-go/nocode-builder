import useMultipleClickAway from '@/common/hooks/useMultipleClickAway';
import { css } from '@emotion/css';
import { Card, Col, Drawer, Row, Typography } from 'antd';
import { mock } from 'mockjs';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

// 定义抽屉的引用类型
export type WidgetDrawerRef = {
  open: () => void;
  close: () => void;
  switch: () => void;
};

// 定义数据类型
type CardData = {
  title: string;
  content: string;
  image: string;
};

// 使用 Mock.js 生成模拟数据
const data: CardData[] = mock({
  'data|100': [
    {
      title: '@title',
      image: '@image(150x100, @color)',
    },
  ],
}).data;

export const WidgetDrawer = forwardRef<
  WidgetDrawerRef,
  {
    widgetOpenBtnRef: React.RefObject<HTMLButtonElement>;
  }
>((props, ref) => {
  const [visible, setVisible] = useState(false);
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

  return (
    <Drawer
      placement="bottom"
      title={'部件库'}
      closable={true}
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
      </div>
    </Drawer>
  );
});
