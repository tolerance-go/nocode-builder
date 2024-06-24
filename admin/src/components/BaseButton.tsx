import { cx } from "@emotion/css";
import { Button, ButtonProps } from "antd";

export const IconHoverableButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      className={cx(
        props.className,
        "text-gray-400 group-hover:text-gray-900"
      )}
    />
  );
};
