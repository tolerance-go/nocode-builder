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

  const text = node.settings?.text;
  ensure(
    text === undefined || typeof text === "string",
    "node.settings?.text 类型必须是 string。"
  );
  return (
    <div
      {...rest}
      style={{
        display: "inline-flex",
        ...rest.style,
      }}
    >
      <AntdButton>{text ?? children}</AntdButton>
    </div>
  );
};
