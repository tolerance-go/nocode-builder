import { useAppSelector } from '@/core/managers/UIStoreManager';
import { EllipsisOutlined } from '@ant-design/icons';
import { 测试标识 } from '@cypress/shared/constants';
import { Button, Dropdown, Flex, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

export const UserBar = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const username = useAppSelector((state) => state.userInfo.username);

  return (
    <Flex
      style={{
        padding: `${token.paddingXXS}px ${token.paddingXXS}px`,
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
        <Button type="text">{username}</Button>
      </Dropdown>
      <Button type="text" icon={<EllipsisOutlined />}></Button>
    </Flex>
  );
};
