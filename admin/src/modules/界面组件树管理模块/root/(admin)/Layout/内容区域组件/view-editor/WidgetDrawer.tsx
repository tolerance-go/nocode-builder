import { Drawer, Card, Row, Col, Flex } from 'antd';
import { mock } from 'mockjs';
import { forwardRef, useImperativeHandle, useState } from 'react';

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
      image: '@image(200x150, @color)',
    },
  ],
}).data;

export const WidgetDrawer = forwardRef<WidgetDrawerRef>((_props, ref) => {
  const [visible, setVisible] = useState(false);

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

  return (
    <Drawer
      title="部件库"
      placement="bottom"
      closable={true}
      onClose={onClose}
      open={visible}
      height={400}
      mask={false}
      getContainer={false}
    >
      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col key={index} span={24 / 6}>
            <Card hoverable title={item.title} bordered={false}>
              <Flex justify="center">
                <img
                  alt={item.title}
                  src={item.image}
                  style={{ borderRadius: 0 }}
                />
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </Drawer>
  );
});
