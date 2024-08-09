import { antdProps, validateComponentProps } from '@unocode/common';
import { Button as AntdButton } from 'antd';
import { WidgetComponentProps } from '../../../types';
import { forwardRef } from 'react';

export const Button = forwardRef<HTMLButtonElement, WidgetComponentProps>(
  (props, ref) => {
    if (props.mode === 'edit') {
      const { slotElements, dataSets, props: propsData } = props;

      const { text } = validateComponentProps(
        antdProps.Button.schema,
        propsData,
      );

      console.log('Button text', text);

      return (
        <AntdButton ref={ref} {...dataSets}>
          {text ?? slotElements?.children}
        </AntdButton>
      );
    }

    const { text } = validateComponentProps(
      antdProps.Button.schema,
      props.defaultProps,
    );

    return <AntdButton ref={ref}>{text}</AntdButton>;
  },
);
