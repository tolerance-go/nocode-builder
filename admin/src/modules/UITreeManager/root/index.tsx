import { ConfigProvider, message, Modal, notification } from 'antd';
import { useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../UIStoreManager';
import { themeConfig } from '../configs';
import { use导航系统, use界面状态管理者, 获取系统上下文 } from '../hooks';
// import '@antv/s2-react/dist/style.min.css';
import zhCN from 'antd/locale/zh_CN';

export function Root() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    slices: {
      location: { actions: locationActions },
    },
  } = use界面状态管理者();
  const navigate = useNavigate();

  const [messageApi, msgContextHolder] = message.useMessage();
  const [modalApi, modalContextHolder] = Modal.useModal();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  const { 界面通知系统 } = 获取系统上下文();

  const 导航系统 = use导航系统();

  useLayoutEffect(() => {
    dispatch(locationActions.updatePathname(location.pathname));
  }, [location, dispatch, locationActions]);

  useLayoutEffect(() => {
    导航系统.setNavigate(navigate);
  }, [navigate, 导航系统]);

  useLayoutEffect(() => {
    界面通知系统.setMessageApi(messageApi);
  }, [messageApi, 界面通知系统]);

  useLayoutEffect(() => {
    界面通知系统.setModalApi(modalApi);
  }, [modalApi, 界面通知系统]);

  useLayoutEffect(() => {
    界面通知系统.setNotificationApi(notificationApi);
  }, [notificationApi, 界面通知系统]);

  return (
    <ConfigProvider theme={themeConfig} locale={zhCN}>
      <Outlet />
      {msgContextHolder}
      {modalContextHolder}
      {notificationContextHolder}
    </ConfigProvider>
  );
}
