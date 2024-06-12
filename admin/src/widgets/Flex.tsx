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
  ensure(
    isPlainObject(children) || children === undefined,
    "children 类型应该是对象。"
  );
  return (
    <div {...rest}>
      <AntdFlex>
        {isEmpty(children?.default) ? (
          <SlotPlaceholder
            slotName="default"
            parentNode={node}
          ></SlotPlaceholder>
        ) : (
          children?.default
        )}
      </AntdFlex>
    </div>
  );
};
