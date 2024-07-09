import { Sider } from './Sider';
import { 拖拽跟随鼠标的容器 } from './拖拽跟随鼠标的容器';

export const Layout = () => {
  return (
    <div
      style={{
        overflow: 'hidden',
        height: '100vh',
        position: 'relative',
      }}
    >
      <拖拽跟随鼠标的容器 />
      <Sider />
    </div>
  );
};
