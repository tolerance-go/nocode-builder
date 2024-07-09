import { MoreOutlined } from '@ant-design/icons';
import { 测试标识 } from '@cypress/shared/constants';
import { Flex, Dropdown, Button, Avatar, theme, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export const UserBar = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Flex
      style={{
        padding: `${token.paddingXS}px ${token.paddingSM}px`,
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
        placement="topRight"
      >
        <Button
          type="text"
          size="small"
          style={{
            padding: `${token.padding}px ${token.paddingSM}px`,
          }}
        >
          <Space>
            <Avatar size="small" data-test-id={测试标识.用户头像}></Avatar>
            <Typography.Text>yb</Typography.Text>
          </Space>
        </Button>
      </Dropdown>
      <Button type="text" size="small" icon={<MoreOutlined />}></Button>
    </Flex>
  );
};
