import { DesignableComponentProps } from "@/types";
import { ensure } from "@/utils/ensure";
import { isPlainObject } from "@/utils/isPlainObject";
import { Button } from "antd";

export const Custom = ({ children, ...rest }: DesignableComponentProps) => {
  ensure(!isPlainObject(children), "children 类型应该是 ReactNode。");

  return (
    <div {...rest}>
      <Button>自定义按钮</Button>
      {children}
    </div>
  );
};
