import { 事件中心系统 } from '@/modules/事件中心系统';

export const handleLoginSuccess = (
  accessToken: string,
  navigate: (path: string) => void,
  全局事件系统实例: 事件中心系统,
) => {
  全局事件系统实例.emit('界面视图管理者/用户登录成功', {
    token: accessToken,
  });
  navigate('/');
};
