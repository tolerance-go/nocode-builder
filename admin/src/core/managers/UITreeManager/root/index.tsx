import { ConfigProvider } from 'antd';
import React, { useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../UIStoreManager';
import { themeConfig } from '../configs';
import { use导航系统, use界面状态管理者 } from '../hooks';
// import '@antv/s2-react/dist/style.min.css';

export function Root() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    slices: {
      location: { actions: locationActions },
    },
  } = use界面状态管理者();
  const navigate = useNavigate();

  const 导航系统 = use导航系统();

  useLayoutEffect(() => {
    dispatch(locationActions.updatePathname(location.pathname));
  }, [location, dispatch, locationActions]);

  React.useEffect(() => {
    导航系统.setNavigate(navigate);
  }, [navigate, 导航系统]);

  return (
    <ConfigProvider theme={themeConfig}>
      <Outlet />
    </ConfigProvider>
  );
}
