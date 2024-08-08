import { Flex as AntdFlex } from 'antd';
import { WidgetComponentProps } from '../../../types';
import { forwardRef } from 'react';

export const Flex = forwardRef<HTMLDivElement, WidgetComponentProps>(
  (props, ref) => {
    if (props.mode === 'edit') {
      const { slotElements } = props;
      return <AntdFlex ref={ref}>{slotElements?.children}</AntdFlex>;
    }

    // const { text, ...buttonProps } = validateComponentProps(
    //   antdProps.Button.schema,
    //   props.defaultProps,
    // );

    return <AntdFlex ref={ref}>Flex</AntdFlex>;
  },
);
