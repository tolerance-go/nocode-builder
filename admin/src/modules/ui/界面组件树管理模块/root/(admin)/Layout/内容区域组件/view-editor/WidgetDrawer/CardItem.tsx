import { useAppDispatch } from '@/modules/ui/界面状态仓库模块';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { FileImageOutlined } from '@ant-design/icons';
import { Card, Typography, theme } from 'antd';
import { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ItemType } from '../../constants';
import { WidgetDisplayEnum } from '@/_gen/models';
import { WidgetWithLibResponseDto } from '@/_gen/api';

// 定义数据类型
export type CardData = {
  title: string;
  content?: string;
  image?: string;
  widgetData: WidgetWithLibResponseDto;
  widgetLibName: string;
  widgetName: string;
  componentDisplay: WidgetDisplayEnum;
};

export type CardDragItem = {
  title: string;
  cardWidth?: number;
  widgetLibName: string;
  widgetName: string;
  componentDisplay: WidgetDisplayEnum;
  widgetData: WidgetWithLibResponseDto;
};

export const CardItem = ({ item }: { item: CardData }) => {
  const { token } = theme.useToken();
  const cardRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const {
    界面状态仓库模块: {
      slices: { projectContent },
    },
  } = 获取模块上下文();

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemType.CARD,
    item: () =>
      ({
        title: item.title,
        cardWidth: cardRef.current?.getBoundingClientRect().width,
        widgetLibName: item.widgetLibName,
        widgetName: item.widgetName,
        componentDisplay: item.componentDisplay,
        widgetData: item.widgetData,
      }) satisfies CardDragItem,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (preview) {
      preview(new Image());
    }
  }, [preview]);

  useEffect(() => {
    dispatch(projectContent.actions.更新拖拽状态(isDragging));
  }, [isDragging, dispatch, projectContent.actions]);

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
