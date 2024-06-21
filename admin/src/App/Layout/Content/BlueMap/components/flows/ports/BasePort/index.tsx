import { css } from "@emotion/css";
import { ReactPortComponentProps } from "../../../../types";
import colors from "tailwindcss/colors";
import { createContext, useContext } from "react";

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

export const BasePortContext = createContext<{
  datasets?: object;
  renderIcon?: (icon: React.ReactNode) => React.ReactNode;
} | null>(null);

export const BasePort = ({
  children,
  datasets,
  port,
  icon,
}: ReactPortComponentProps & BasePortProps) => {
  const basePortContext = useContext(BasePortContext);
  return (
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
  );
};
