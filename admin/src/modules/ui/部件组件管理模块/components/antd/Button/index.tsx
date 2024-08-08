import { antdProps, validateComponentProps } from '@unocode/common';
import { Button as AntdButton } from 'antd';
import { WidgetComponentProps } from '../../../types';
import { forwardRef } from 'react';

export const Button = forwardRef<HTMLButtonElement, WidgetComponentProps>(
  (props, ref) => {
    if (props.mode === 'edit') {
      const { slotElements, dataSets } = props;
      return (
        <AntdButton ref={ref} {...dataSets}>
          {'Button' ?? slotElements?.children}
        </AntdButton>
      );
    }

    const { text, ...buttonProps } = validateComponentProps(
      antdProps.Button.schema,
      props.defaultProps,
    );

    return (
      <AntdButton ref={ref} {...buttonProps}>
        {text}
      </AntdButton>
    );
  },
);
