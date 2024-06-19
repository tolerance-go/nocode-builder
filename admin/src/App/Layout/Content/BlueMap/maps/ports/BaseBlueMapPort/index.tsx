import { BlueMapPortComponentProps } from "../../../types";

export const BaseBlueMapPort = ({
  blueMapPort,
  children,
}: BlueMapPortComponentProps & {
  children?: React.ReactNode;
}) => {
  return (
    <div data-blue-map-port-type={blueMapPort.config.type}>{children}</div>
  );
};
