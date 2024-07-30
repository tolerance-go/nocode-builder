import { TOKEN_KEY } from '@/common/constants';
import { redirectTo } from '@/common/utils';
import store from 'store2';

export const handleLoginSuccess = (username: string, accessToken: string) => {
  store.set(TOKEN_KEY, accessToken);
  redirectTo(username.startsWith('@') ? 'custom' : '');
};
