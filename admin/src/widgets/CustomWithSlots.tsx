import { SlotPlaceholder } from "@/components/SlotPlaceholder";
import { DesignableComponentProps } from "@/types";
import { ensure } from "@/utils/ensure";
import { isEmpty } from "@/utils/isEmpty";
import { isPlainObject } from "@/utils/isPlainObject";
import { Button } from "antd";

export const CustomWithSlots = ({
  children,
  node,
  ...rest
}: DesignableComponentProps) => {
  ensure(isPlainObject(children), "children 类型是对象");

  return (
    <div {...rest}>
      <Button>自定义按钮</Button>
      <div>
        slot0:
        {isEmpty(children.slot0) ? (
          <SlotPlaceholder slotName="slot0" parentNode={node}></SlotPlaceholder>
        ) : (
          children.slot0
        )}
      </div>
      <div>
        slot1:{" "}
        {isEmpty(children.slot1) ? (
          <SlotPlaceholder slotName="slot1" parentNode={node}></SlotPlaceholder>
        ) : (
          children.slot1
        )}
      </div>
      <div>
        slot2:{" "}
        {isEmpty(children.slot2) ? (
          <SlotPlaceholder slotName="slot2" parentNode={node}></SlotPlaceholder>
        ) : (
          children.slot2
        )}
      </div>
      <div>
        slot3:{" "}
        {isEmpty(children.slot3) ? (
          <SlotPlaceholder slotName="slot3" parentNode={node}></SlotPlaceholder>
        ) : (
          children.slot3
        )}
      </div>
    </div>
  );
};
