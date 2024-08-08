import { Flex, theme } from 'antd';
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
        width: 300,
        flexShrink: 0,
      }}
    >
      <UserBar />
      <ProjectTree />
    </Flex>
  );
};
