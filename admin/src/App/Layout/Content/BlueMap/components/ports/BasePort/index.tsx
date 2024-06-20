import { css } from "@emotion/css";
import { ReactPortComponentProps } from "../../../types";
import colors from "tailwindcss/colors";

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

export const BasePort = ({
  children,
  datasets,
  port,
}: ReactPortComponentProps & {
  children?: React.ReactNode;
  datasets?: object;
}) => {
  return (
    <div
      {...{
        ...datasets,
        "data-port": true,
        "data-port-group": port.group,
      }}
      className={gradientHoverStyle}
    >
      {children}
    </div>
  );
};
