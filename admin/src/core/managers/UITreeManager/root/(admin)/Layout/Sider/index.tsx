import { Button, Flex, theme } from 'antd';
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
      <div
        style={{
          padding: `${token.paddingXXS}px ${token.paddingXXS}px`,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <Button
          type="text"
          style={{
            border: `1px solid ${token.colorBorder}`,
          }}
          block
        >
          新建
        </Button>
      </div>
      <Header />
      <ProjectTree />
    </Flex>
  );
};
