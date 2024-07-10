import { Sider } from './Sider';
import { 内容区域组件 } from './内容区域组件';
import { 拖拽跟随鼠标的容器 } from './拖拽跟随鼠标的容器';

export const Layout = () => {
  return (
    <div
      style={{
        overflow: 'hidden',
        height: '100vh',
        position: 'relative',
        display: 'flex',
      }}
    >
      <拖拽跟随鼠标的容器 />
      <Sider />
      <内容区域组件 />
    </div>
  );
};
