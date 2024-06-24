import { Button, ButtonProps } from "antd";
import {
  FC,
  FunctionComponent,
  FunctionComponentElement,
  cloneElement,
  isValidElement,
} from "react";

export const IconHoverableButton = ({
  icon,
  ...props
}: Omit<ButtonProps, "icon"> & {
  icon?: FunctionComponentElement<{
    className?: string;
  }>;
}) => {
  return (
    <Button
      {...props}
      className="group"
      icon={
        isValidElement(icon)
          ? cloneElement(icon, {
              className:
                "text-gray-400 group-hover:text-gray-900 transition-colors",
            })
          : icon
      }
    />
  );
};
