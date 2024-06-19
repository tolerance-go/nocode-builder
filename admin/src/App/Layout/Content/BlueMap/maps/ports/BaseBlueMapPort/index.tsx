import { BasePort } from "../../../components/ports/BasePort";
import { BlueMapPortComponentProps } from "../../../types";

export const BaseBlueMapPort = ({
  blueMapPort,
  children,
  ...rest
}: BlueMapPortComponentProps & {
  children?: React.ReactNode;
}) => {
  return (
    <BasePort
      {...rest}
      datasets={{
        "data-blue-map-port-type": blueMapPort.config.type,
      }}
    >
      {children}
    </BasePort>
  );
};
