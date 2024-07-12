import { AppDispatch, AppSlices } from '@/core/managers/UIStoreManager';
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
