import { useAppSelector } from '@/modules/界面状态管理器模块';
import { layoutPadding } from '@/modules/界面组件树管理模块/configs';
import { EllipsisOutlined } from '@ant-design/icons';
import { 测试标识 } from '@/common/constants';
import { Button, Dropdown, Flex, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { use全局事件系统 } from '@/modules/界面组件树管理模块/hooks';

export const UserBar = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const 事件中心系统 = use全局事件系统();

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
              label: <span data-test-id={测试标识.登出按钮文本}>登出</span>,
              onClick: () => {
                事件中心系统.emit('界面视图管理者/用户登出成功', undefined);
                navigate('/login');
              },
            },
          ],
        }}
        placement="bottomRight"
      >
        <Button data-test-id={测试标识.用户信息显示按钮} type="text">
          <span data-test-id={测试标识.用户名称文本}>{username}</span>
        </Button>
      </Dropdown>
      <Button type="text" icon={<EllipsisOutlined />}></Button>
    </Flex>
  );
};
