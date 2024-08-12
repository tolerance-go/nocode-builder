import { Flex as AntdFlex, theme } from 'antd';
import { WidgetCompApis, WidgetComponentProps } from '../../../types';
import { CSSProperties, forwardRef, useImperativeHandle, useRef } from 'react';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { flexSchema } from './props';
import { SlotStyleContext } from '@/modules/ui/界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot/Placeholder';
import { SlotPlaceholderPosition } from '@/modules/ui/界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot/Placeholder/enums';

const PreviewDumpBox = ({
  background,
  width,
  height = 40,
}: {
  background: string;
  width: number | string;
  height?: number | string;
}) => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        width,
        height,
        border: `1px dashed ${background}`,
        background,
        borderRadius: token.borderRadius,
        flexShrink: 0,
      }}
    ></div>
  );
};

export const Flex = forwardRef<WidgetCompApis, WidgetComponentProps>(
  (props, ref) => {
    const { token } = theme.useToken();
    const { 部件组件管理模块 } = 获取模块上下文();

    const innerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => {
      return {
        获取舞台预览组件尺寸: () => {
          if (props.mode !== 'preview') {
            throw new Error('非预览模式下无法获取组件舞台预览尺寸');
          }

          return {
            width: '100%',
            height: innerRef.current?.offsetHeight,
          };
        },
      };
    });

    if (props.mode === 'edit') {
      const { slotElements, isDragging, props: propsData } = props;

      const compProps = 部件组件管理模块.validateComponentProps(
        flexSchema,
        propsData,
      );

      const style: CSSProperties | undefined = isDragging
        ? {
            border: `2px dashed ${token.colorBorder}`,
            padding: token.padding,
            width: '100%',
          }
        : undefined;

      return (
        <AntdFlex ref={innerRef} style={style} {...compProps}>
          <SlotStyleContext.Provider
            value={{
              getSlotPlaceholderStyle({ position }) {
                if (position === SlotPlaceholderPosition.Empty) {
                  return {
                    width: '100%',
                  };
                }
              },
            }}
          >
            {slotElements?.children}
          </SlotStyleContext.Provider>
        </AntdFlex>
      );
    }

    if (props.mode === 'stage-preview') {
      return (
        <AntdFlex
          ref={innerRef}
          style={{
            padding: token.padding,
            width: '100%',
            border: `2px dashed ${token.colorBorder}`,
          }}
          gap={10}
        >
          <PreviewDumpBox
            width={'33%'}
            background={token.green3}
          ></PreviewDumpBox>
          <PreviewDumpBox
            width={'67%'}
            background={token.cyan3}
          ></PreviewDumpBox>
        </AntdFlex>
      );
    }

    return (
      <AntdFlex
        ref={innerRef}
        style={{
          padding: token.padding,
          border: `2px dashed ${token.colorBorder}`,
        }}
        gap={10}
      >
        <PreviewDumpBox width={20} background={token.green3}></PreviewDumpBox>
        <PreviewDumpBox width={40} background={token.cyan3}></PreviewDumpBox>
      </AntdFlex>
    );
  },
);
