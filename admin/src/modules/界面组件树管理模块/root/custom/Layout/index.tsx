import { Flex, Tag, theme } from 'antd';
import { Menu } from './Menu';
import { Table } from './Table';
import { AccountSelector } from './AccountSelector';
import { OperationBar } from './OperationBar';
import { UpdateTimer } from './UpdateTimer';

export const Layout = () => {
  const { token } = theme.useToken();

  return (
    <Flex
      vertical
      style={{
        height: '100vh',
        // menu 下边缘会多出 1px
        overflow: 'hidden',
      }}
    >
      <Flex
        justify="space-between"
        style={{
          padding: token.controlPaddingHorizontalSM,
        }}
      >
        <AccountSelector />
      </Flex>

      <Flex
        justify="space-between"
        style={{
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Menu />
        <OperationBar />
      </Flex>
      <Flex
        justify="space-between"
        style={{
          padding: token.controlPaddingHorizontalSM,
        }}
      >
        <UpdateTimer />
      </Flex>
      <div
        style={{
          flexGrow: 1,
        }}
      >
        <Table />
      </div>
    </Flex>
  );
};
