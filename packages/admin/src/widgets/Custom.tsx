import { DesignableComponentProps } from "@/types";
import { Button } from "antd";

export const Custom = ({
  children,
  ...rest
}: DesignableComponentProps<React.ReactNode>) => {
  return (
    <div {...rest}>
      <Button>自定义按钮</Button>
      {children}
    </div>
  );
};
