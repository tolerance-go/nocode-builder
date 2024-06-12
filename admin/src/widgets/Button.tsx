import { DesignableComponentProps } from "@/types";
import { ensure } from "@/utils/ensure";
import { isPlainObject } from "@/utils/isPlainObject";
import { Button as AntdButton } from "antd";

export const Button = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  node,
  children,
  ...rest
}: DesignableComponentProps) => {
  ensure(!isPlainObject(children), "children 类型应该是 ReactNode。");
  return (
    <div
      {...rest}
      style={{
        display: "inline-flex",
        ...rest.style,
      }}
    >
      <AntdButton>{children}</AntdButton>
    </div>
  );
};
