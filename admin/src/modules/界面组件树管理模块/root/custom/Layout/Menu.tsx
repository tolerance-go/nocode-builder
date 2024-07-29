import React, { useState } from 'react';
import {
  TransactionOutlined,
  SwapOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as AntdMenu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '交易',
    key: 'transaction',
    icon: <TransactionOutlined />,
  },
  {
    label: '成交',
    key: 'trade',
    icon: <SwapOutlined />,
  },
  {
    label: '持仓',
    key: 'holding',
    icon: <ContainerOutlined />,
  },
];

export const Menu: React.FC = () => {
  const [current, setCurrent] = useState('transaction');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <AntdMenu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
