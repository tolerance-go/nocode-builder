import { Button as AntdButton } from 'antd';
import { WidgetComponentProps } from '../../../types';

export const Button = ({
  text,
  slotElements,
}: WidgetComponentProps & {
  text?: string;
}) => {
  return <AntdButton>hi{text ?? slotElements?.children}</AntdButton>;
};
