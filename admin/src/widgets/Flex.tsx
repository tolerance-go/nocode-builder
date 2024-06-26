import { SlotPlaceholder } from "@/components/SlotPlaceholder";
import { DesignableComponentProps } from "@/types/common";
import { isEmpty } from "@/utils/isEmpty";
import { Flex as AntdFlex } from "antd";

export const Flex = ({
  node,
  children,
  ...rest
}: DesignableComponentProps<React.ReactNode>) => {
  return (
    <div {...rest}>
      <AntdFlex>
        {isEmpty(children) ? (
          <SlotPlaceholder parentNode={node}></SlotPlaceholder>
        ) : (
          children
        )}
      </AntdFlex>
    </div>
  );
};
