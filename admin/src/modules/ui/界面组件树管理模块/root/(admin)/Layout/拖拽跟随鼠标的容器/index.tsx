import { useAppSelector } from '@/modules/ui/界面状态仓库模块';
import { use跟随鼠标显示内容管理者 } from '@/modules/ui/界面组件树管理模块/hooks';
import { 组件测试标识 } from '@/common/constants';
import { theme } from 'antd';
import { useLayoutEffect, useState } from 'react';

export const 拖拽跟随鼠标的容器 = () => {
  const { token } = theme.useToken();
  const 鼠标附近的跟随节点是否显示 = useAppSelector(
    (state) => state.layout.拖拽时鼠标附近的跟随组件是否显示,
  );
  const 鼠标附近的跟随组件id和参数 = useAppSelector(
    (state) => state.layout.拖拽时鼠标附近的跟随组件id和参数,
  );
  const 跟随鼠标显示内容管理者 = use跟随鼠标显示内容管理者();

  // 鼠标位置
  const [mousePos, setMousePos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // 监听 body 的鼠标移动
  useLayoutEffect(() => {
    if (鼠标附近的跟随节点是否显示) {
      // 监听鼠标移动
      const handleMouseDrag = (e: MouseEvent) => {
        setMousePos({
          x: e.clientX,
          y: e.clientY,
        });
      };

      document.addEventListener('drag', handleMouseDrag);

      return () => {
        setMousePos(null);
        document.removeEventListener('drag', handleMouseDrag);
      };
    }
  }, [鼠标附近的跟随节点是否显示]);

  const 跟随鼠标的组件元素 =
    鼠标附近的跟随组件id和参数 &&
    跟随鼠标显示内容管理者.根据id获取组件(
      鼠标附近的跟随组件id和参数[0],
      鼠标附近的跟随组件id和参数[1],
    );

  return 鼠标附近的跟随节点是否显示 && 跟随鼠标的组件元素 && mousePos ? (
    <div
      style={{
        position: 'absolute',
        top: mousePos.y,
        left: mousePos.x + 20,
        zIndex: token.zIndexPopupBase + 1,
      }}
      data-test-id={组件测试标识.拖拽跟随鼠标的容器}
    >
      {跟随鼠标的组件元素}
    </div>
  ) : null;
};
