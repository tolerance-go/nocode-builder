import { 组件测试标识 } from '@/common/constants';
import { useAppSelector } from '@/modules/界面状态仓库模块';
import { layoutPadding } from '@/modules/界面组件树管理模块/configs';
import { use全局事件系统 } from '@/modules/界面组件树管理模块/hooks';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, theme } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { useNavigate } from 'react-router-dom';
import { DataManagerModal, DataManagerModalRef } from './DataManagerModal';
import { useRef } from 'react';

export const UserBar = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const 事件中心系统 = use全局事件系统();
  const modalRef = useRef<DataManagerModalRef>(null);
  const userIsAdmin = useAppSelector((state) => state.userInfo.isAdmin);

  const username = useAppSelector((state) => state.userInfo.username);

  return (
    <Flex
      style={{
        padding: layoutPadding(token),
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
      }}
      justify="space-between"
      align="center"
    >
      <Dropdown
        menu={{
          items: [
            {
              key: '1',
              label: <span data-test-id={组件测试标识.登出按钮文本}>登出</span>,
              onClick: () => {
                事件中心系统.emit('界面视图管理者/用户登出成功', undefined);
                navigate('/login');
              },
            },
          ],
        }}
        placement="bottom"
      >
        <Button data-test-id={组件测试标识.用户信息显示按钮} type="text">
          <span data-test-id={组件测试标识.用户名称文本}>{username}</span>
        </Button>
      </Dropdown>

      <Dropdown
        menu={{
          items: [
            userIsAdmin && {
              key: '1',
              label: <span>管理数据</span>,
              onClick: () => {
                modalRef.current?.open();
              },
            },
          ].filter(Boolean) as ItemType[],
        }}
        placement="bottom"
      >
        <Button type="text" icon={<EllipsisOutlined />}></Button>
      </Dropdown>
      <DataManagerModal ref={modalRef} />
    </Flex>
  );
};
