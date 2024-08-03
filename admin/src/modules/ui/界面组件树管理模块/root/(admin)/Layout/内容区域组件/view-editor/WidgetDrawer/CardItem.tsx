import { FileImageOutlined } from '@ant-design/icons';
import { Card, Typography, theme } from 'antd';
import { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';

// 定义数据类型
export type CardData = {
  title: string;
  content?: string;
  image?: string;
};

export const CardItem = ({ item }: { item: CardData }) => {
  const { token } = theme.useToken();
  const cardRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'CARD',
    item: () => ({
      title: item.title,
      width: cardRef.current?.getBoundingClientRect().width,
    }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (preview) {
      preview(new Image());
    }
  }, [preview]);

  return (
    <div ref={cardRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div ref={drag}>
        <Card
          size="small"
          hoverable
          bordered={false}
          cover={
            item.image ? (
              <img
                style={{
                  width: 200,
                  height: 150,
                  objectFit: 'cover',
                }}
                alt={item.title}
                src={item.image}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: 150,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                  backgroundColor: token.colorBgBase,
                }}
              >
                <FileImageOutlined />
              </div>
            )
          }
        >
          <Typography.Text strong>{item.title}</Typography.Text>
        </Card>
      </div>
    </div>
  );
};
