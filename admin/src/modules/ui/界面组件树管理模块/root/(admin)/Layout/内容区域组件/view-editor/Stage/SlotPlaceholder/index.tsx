import { SlotProps } from '../types';
import { SlotPlaceholderType } from './enums';

export interface SlotPlaceholderProps extends SlotProps {
  type: SlotPlaceholderType;
}

export const SlotPlaceholder = ({ style }: SlotPlaceholderProps) => {
  return (
    <div
      style={{
        ...style,
        boxSizing: 'border-box',
      }}
    ></div>
  );
};
