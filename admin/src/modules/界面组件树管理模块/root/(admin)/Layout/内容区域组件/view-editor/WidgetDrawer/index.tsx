import { WidgetPlatformTypeEnum } from '@/_gen/models';
import useMultipleClickAway from '@/common/hooks/useMultipleClickAway';
import {
  projectDetailIsViewProjectDetail,
  projectTreeNodeDataIsProjectTreeNodeFileData,
} from '@/common/utils';
import { api } from '@/globals';
import { useAppSelector } from '@/modules/界面状态仓库模块';
import { css } from '@emotion/css';
import { Col, Drawer, Row, Spin } from 'antd';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { CardData, CardItem } from './CardItem';

// 定义抽屉的引用类型
export type WidgetDrawerRef = {
  open: () => void;
  close: () => void;
  switch: () => void;
};

// 使用 Axios 获取数据
const fetchData = async (
  platformType: WidgetPlatformTypeEnum,
): Promise<CardData[]> => {
  try {
    const widgets = await api.widgets.getWidgetsFilterByPlatform({
      platformType,
    });
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
  const 激活的项目节点数据 = useAppSelector((state) =>
    state.projectTree.激活的节点的key
      ? state.projectTree.项目树节点数据[state.projectTree.激活的节点的key]
      : null,
  );

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
      if (!激活的项目节点数据) {
        throw new Error('data error');
      }

      if (!projectTreeNodeDataIsProjectTreeNodeFileData(激活的项目节点数据)) {
        throw new Error('data error');
      }

      if (!projectDetailIsViewProjectDetail(激活的项目节点数据.projectDetail)) {
        throw new Error('data error');
      }

      setLoading(true);
      const fetchedData = await fetchData(
        激活的项目节点数据.projectDetail.platform,
      );
      setData(fetchedData);
      setLoading(false);
    };

    if (visible) {
      loadData();
    }
  }, [visible, 激活的项目节点数据]);

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
                <CardItem item={item} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Drawer>
  );
});
