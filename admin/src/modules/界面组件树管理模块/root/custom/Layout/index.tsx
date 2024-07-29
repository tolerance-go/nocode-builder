import { Flex } from 'antd';
import { Menu } from './Menu';
import { Table } from './Table';
import { AccountSelector } from './AccountSelector';
import { OperationBar } from './OperationBar';

export const Layout = () => {
  return (
    <Flex
      vertical
      style={{
        height: '100vh',
        // menu 下边缘会多出 1px
        overflow: 'hidden',
      }}
    >
      <AccountSelector />
      <Flex justify="space-between">
        <Menu />
        <OperationBar />
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
