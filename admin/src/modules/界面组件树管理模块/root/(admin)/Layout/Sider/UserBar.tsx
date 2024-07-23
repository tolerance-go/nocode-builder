import { useAppSelector } from '@/modules/界面状态管理器模块';
import { layoutPadding } from '@/modules/界面组件树管理模块/configs';
import { EllipsisOutlined } from '@ant-design/icons';
import { 测试标识 } from '@/common/constants';
import { Button, Dropdown, Flex, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

export const UserBar = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

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
