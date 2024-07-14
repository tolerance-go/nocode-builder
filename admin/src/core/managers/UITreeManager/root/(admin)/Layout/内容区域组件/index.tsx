import { 测试标识 } from '@cypress/shared/constants';
import { Outlet } from 'react-router-dom';

export const 内容区域组件 = () => {
  return (
    <div
      data-test-id={测试标识.内容区域组件}
      style={{
        flexGrow: 1,
      }}
    >
      <Outlet />
    </div>
  );
};
