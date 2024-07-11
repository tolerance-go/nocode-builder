import { updatePathname, useAppDispatch } from '@/core/managers/UIStoreManager';
import { hexToRgb } from '@/utils';
import { ConfigProvider, theme } from 'antd';
import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// import '@antv/s2-react/dist/style.min.css';

export function Root() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { token } = theme.useToken();

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
            directoryNodeSelectedBg: `rgba(${hexToRgb(token.blue6).join(', ')}, 0.4)`,
          },
        },
      }}
    >
      <Outlet />
    </ConfigProvider>
  );
}
