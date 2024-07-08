import { Sider } from './Sider';

export const Layout = () => {
  return (
    <div
      style={{
        overflow: 'hidden',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Sider />
    </div>
  );
};
