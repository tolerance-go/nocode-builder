import { hexToRgb } from '@/utils';
import { ConfigProvider, theme } from 'antd';
import { useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../UIStoreManager';
import { use导航系统, use界面状态管理者 } from '../hooks';
import React from 'react';
// import '@antv/s2-react/dist/style.min.css';

export function Root() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    slices: {
      location: { actions: locationActions },
    },
  } = use界面状态管理者();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const 导航系统 = use导航系统();

  useLayoutEffect(() => {
    dispatch(locationActions.updatePathname(location.pathname));
  }, [location, dispatch, locationActions]);

  React.useEffect(() => {
    导航系统.setNavigate(navigate);
  }, [navigate, 导航系统]);

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
