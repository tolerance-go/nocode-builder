import { Button as AntdButton } from 'antd';
import { WidgetComponentProps } from '../../../types';
import { forwardRef } from 'react';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { buttonSchema } from './props';

export const Button = forwardRef<HTMLButtonElement, WidgetComponentProps>(
  (props, ref) => {
    const { 部件组件管理模块 } = 获取模块上下文();

    if (props.mode === 'edit') {
      const { slotElements, dataSets, props: propsData } = props;

      const { text } = 部件组件管理模块.validateComponentProps(
        buttonSchema,
        propsData,
      );

      return (
        <AntdButton ref={ref} {...dataSets}>
          {text ?? slotElements?.children}
        </AntdButton>
      );
    }

    const { text } = 部件组件管理模块.validateComponentProps(
      buttonSchema,
      props.defaultProps,
    );

    return <AntdButton ref={ref}>{text}</AntdButton>;
  },
);
