import { Button as AntdButton } from 'antd';
import { WidgetCompApis, WidgetComponentProps } from '../../../types';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { buttonSchema } from './props';

export const Button = forwardRef<WidgetCompApis, WidgetComponentProps>(
  (props, ref) => {
    const { 部件组件管理模块 } = 获取模块上下文();
    const innerRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => {
      return {
        获取舞台预览组件尺寸: () => {
          if (props.mode !== 'preview') {
            throw new Error('非预览模式下无法获取组件舞台预览尺寸');
          }

          if (innerRef.current) {
            const { offsetWidth: width, offsetHeight: height } =
              innerRef.current;
            return { width, height };
          }
        },
      };
    });

    if (props.mode === 'edit') {
      const { slotElements, dataSets, props: propsData } = props;

      const { text } = 部件组件管理模块.validateComponentProps(
        buttonSchema,
        propsData,
      );

      return (
        <AntdButton ref={innerRef} {...dataSets}>
          {text ?? slotElements?.children}
        </AntdButton>
      );
    }

    const { text } = 部件组件管理模块.validateComponentProps(
      buttonSchema,
      props.defaultProps,
    );

    return <AntdButton ref={innerRef}>{text}</AntdButton>;
  },
);
