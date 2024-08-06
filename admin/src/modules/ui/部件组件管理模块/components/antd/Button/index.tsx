import { antdProps, validateComponentProps } from '@unocode/common';
import { Button as AntdButton } from 'antd';
import { WidgetComponentProps } from '../../../types';

export const Button = (props: WidgetComponentProps) => {
  if (props.mode === 'edit') {
    const { slotElements } = props;
    return <AntdButton>{slotElements?.children}</AntdButton>;
  }

  const { text, ...buttonProps } = validateComponentProps(
    antdProps.Button.schema,
    props.defaultProps,
  );

  return <AntdButton {...buttonProps}>{text}</AntdButton>;
};
