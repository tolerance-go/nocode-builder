import { css } from "@emotion/css";
import { Dropdown } from "antd";
import { useContext } from "react";
import colors from "tailwindcss/colors";
import { BasePortContext } from "./hooks";
import { PortComponentProps } from "@/types";

const gradientHoverStyle = css`
  position: relative;
  height: 100%;
  background: transparent;

  &:hover {
    background: linear-gradient(
      to right,
      transparent,
      ${colors.gray[200]},
      transparent
    );
  }
`;

export type BasePortProps = {
  children?: (args: { icon: React.ReactNode }) => React.ReactNode;
  datasets?: object;
  icon?: React.ReactNode;
};

export const BasePort = ({
  children,
  datasets,
  port,
  icon,
}: PortComponentProps & BasePortProps) => {
  const basePortContext = useContext(BasePortContext);
  return (
    <Dropdown
      menu={{ items: basePortContext?.menuItems }}
      trigger={["contextMenu"]}
    >
      <div
        {...{
          ...basePortContext?.datasets,
          ...datasets,
          "data-port": true,
          "data-port-id": port.id,
          "data-port-group": port.group,
        }}
        className={gradientHoverStyle}
      >
        {children?.({
          icon: icon ? basePortContext?.renderIcon?.(icon) ?? icon : null,
        })}
      </div>
    </Dropdown>
  );
};
