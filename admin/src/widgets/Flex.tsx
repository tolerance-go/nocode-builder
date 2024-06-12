import { SlotPlaceholder } from "@/components/SlotPlaceholder";
import { DesignableComponentProps } from "@/types";
import { ensure } from "@/utils/ensure";
import { isEmpty } from "@/utils/isEmpty";
import { isPlainObject } from "@/utils/isPlainObject";
import { Flex as AntdFlex } from "antd";

export const Flex = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  node,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  ...rest
}: DesignableComponentProps) => {
  ensure(!isPlainObject(children), "children 类型不应该是简单对象。");
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
