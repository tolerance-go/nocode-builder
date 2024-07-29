import { Flex } from 'antd';
import { Menu } from './Menu';
import { Table } from './Table';
import { AccountSelector } from './AccountSelector';

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
      <Menu />
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
