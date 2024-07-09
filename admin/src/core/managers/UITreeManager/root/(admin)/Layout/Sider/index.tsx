import { Button, Dropdown, Flex, theme } from 'antd';
import { Header } from './Header';
import { ProjectTree } from './ProjectTree';
import { UserBar } from './UserBar';

export const Sider = () => {
  const { token } = theme.useToken();

  return (
    <Flex
      vertical
      style={{
        // 防止加载闪烁
        height: '100vh',
        backgroundColor: token.colorBgContainer,
        width: 400,
      }}
    >
      <UserBar />
      <Header />
      <ProjectTree />
    </Flex>
  );
};
