import { FileImageOutlined } from '@ant-design/icons';
import { Card, Typography, theme } from 'antd';
import { useDrag } from 'react-dnd';

// 定义数据类型
export type CardData = {
  title: string;
  content?: string;
  image?: string;
};

export const CardItem = ({ item }: { item: CardData }) => {
  const { token } = theme.useToken();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { title: item.title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
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
  );
};
