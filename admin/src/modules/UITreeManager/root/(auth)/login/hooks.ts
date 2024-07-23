import { AppDispatch, AppSlices } from '@/modules/界面状态管理器模块';
import store from 'store2';

export const handleLoginSuccess = (
  accessToken: string,
  navigate: (path: string) => void,
  dispatch: AppDispatch,
  slices: AppSlices,
) => {
  store.set('token', accessToken);
  navigate('/');
  dispatch(slices.userInfo.actions.更新token(accessToken));
};
