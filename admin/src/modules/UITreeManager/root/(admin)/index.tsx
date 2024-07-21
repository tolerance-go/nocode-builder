import { Navigate } from 'react-router-dom';
import store from 'store2';
import { Layout } from './Layout';

export const Admin = () => {
  if (!store.get('token')) {
    return <Navigate to={'/login'} />;
  }

  return <Layout />;
};
