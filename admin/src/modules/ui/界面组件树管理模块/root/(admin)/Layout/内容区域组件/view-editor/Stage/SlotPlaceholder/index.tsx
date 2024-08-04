import { theme } from 'antd';
import { SlotProps } from '../types';
import { SlotPlaceholderType } from './enums';

export interface SlotPlaceholderProps extends SlotProps {
  type: SlotPlaceholderType;
}

export const SlotPlaceholder = ({
  style,
  isDragging,
}: SlotPlaceholderProps) => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        ...style,
        ...(isDragging && {
          background: token.blue2,
          border: `1px solid ${token.blue6}`,
        }),
      }}
    ></div>
  );
};
