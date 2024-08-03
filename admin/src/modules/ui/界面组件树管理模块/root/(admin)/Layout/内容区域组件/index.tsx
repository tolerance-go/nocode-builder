import { 组件测试标识 } from '@/common/constants';
import { Outlet } from 'react-router-dom';

export const 内容区域组件 = () => {
  return (
    <div
      data-test-id={组件测试标识.内容区域组件}
      style={{
        flexGrow: 1,
      }}
    >
      <Outlet />
    </div>
  );
};
