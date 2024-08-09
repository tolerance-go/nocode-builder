import { Flex as AntdFlex, theme } from 'antd';
import { WidgetComponentProps } from '../../../types';
import { forwardRef } from 'react';

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

export const Flex = forwardRef<HTMLDivElement, WidgetComponentProps>(
  (props, ref) => {
    const { token } = theme.useToken();

    if (props.mode === 'edit') {
      const { slotElements } = props;
      return <AntdFlex ref={ref}>{slotElements?.children}</AntdFlex>;
    }

    // const { text, ...buttonProps } = validateComponentProps(
    //   antdProps.Button.schema,
    //   props.defaultProps,
    // );

    return (
      <AntdFlex
        ref={ref}
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
