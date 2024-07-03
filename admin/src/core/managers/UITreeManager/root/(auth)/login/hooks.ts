import store from 'store2';

export const handleLoginSuccess = (
  accessToken: string,
  navigate: (path: string) => void,
) => {
  store.set('token', accessToken);
  navigate('/');
};
