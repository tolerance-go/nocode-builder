import { Sider } from './Sider';
import { 内容区域组件 } from './内容区域组件';

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
      <Sider />
      <内容区域组件 />
    </div>
  );
};
