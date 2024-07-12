import { AppDispatch, Slices } from '@/core/managers/UIStoreManager';
import store from 'store2';

export const handleLoginSuccess = (
  accessToken: string,
  navigate: (path: string) => void,
  dispatch: AppDispatch,
  slices: Slices,
) => {
  store.set('token', accessToken);
  navigate('/');
  dispatch(slices.userInfo.actions.更新token(accessToken));
};
