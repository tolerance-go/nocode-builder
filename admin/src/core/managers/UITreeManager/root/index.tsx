import { updatePathname, useAppDispatch } from '@/core/managers/UIStoreManager';
import { ConfigProvider, theme } from 'antd';
import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// import '@antv/s2-react/dist/style.min.css';

export function Root() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(updatePathname(location.pathname));
  }, [location, dispatch]);

  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm],
        components: {
          Tree: {
            borderRadius: 0,
          },
        },
      }}
    >
      <Outlet />
    </ConfigProvider>
  );
}
