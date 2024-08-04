import { theme } from 'antd';

export const useSlotItemStyle = ({ isDragging }: { isDragging: boolean }) => {
  const { token } = theme.useToken();
  return (
    isDragging && {
      background: token.blue2,
      border: `1px solid ${token.blue6}`,
    }
  );
};
