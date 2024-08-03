import { Navigate } from 'react-router-dom';
import store from 'store2';
import { Layout } from './Layout';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';

export const Custom = () => {
  if (!store.get('token')) {
    return <Navigate to={'/login'} />;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm],
        components: {},
      }}
      locale={zhCN}
    >
      <Layout />
    </ConfigProvider>
  );
};
