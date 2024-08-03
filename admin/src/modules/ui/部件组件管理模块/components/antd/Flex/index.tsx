import { Flex as AntdFlex } from 'antd';
import { WidgetComponentProps } from '../../../types';

export const Flex = ({ slotElements }: WidgetComponentProps) => {
  return <AntdFlex>{slotElements?.children}</AntdFlex>;
};
