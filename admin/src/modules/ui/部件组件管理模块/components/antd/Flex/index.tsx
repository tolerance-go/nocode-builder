import { Flex as AntdFlex, theme } from 'antd';
import { WidgetCompApis, WidgetComponentProps } from '../../../types';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { flexSchema } from './props';
import { SlotStyleContext } from '@/modules/ui/界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot/Placeholder';
import { SlotPlaceholderPosition } from '@/modules/ui/界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot/Placeholder/enums';

const PreviewDumpBox = ({
  background,
  width,
}: {
  background: string;
  width: number;
}) => {
  return (
    <div
      style={{
        width,
        height: 40,
        border: `1px dashed ${background}`,
        background,
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
          return {
            width: '100%',
            height: innerRef.current?.offsetHeight,
          };
        },
      };
    });

    if (props.mode === 'edit') {
      const { slotElements, props: propsData } = props;

      const compProps = 部件组件管理模块.validateComponentProps(
        flexSchema,
        propsData,
      );

      return (
        <AntdFlex ref={innerRef} {...compProps}>
          <SlotStyleContext.Provider
            value={{
              getSlotPlaceholderStyle({ position }) {
                if (position === SlotPlaceholderPosition.Empty) {
                  return {
                    height: 50,
                    background: 'red',
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
            padding: 15,
            border: `2px dashed ${token.colorBorder}`,
          }}
          gap={10}
        >
          <PreviewDumpBox width={20} background={token.green3}></PreviewDumpBox>
          <PreviewDumpBox width={40} background={token.cyan3}></PreviewDumpBox>
        </AntdFlex>
      );
    }

    return (
      <AntdFlex
        ref={innerRef}
        style={{
          padding: 15,
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
