import { BasePort } from "../../../components/ports/BasePort";
import { BlueMapPortComponentProps } from "../../../types";

export const BaseBlueMapPort = ({
  blueMapPort,
  children,
  port,
  ...rest
}: BlueMapPortComponentProps & {
  children?: React.ReactNode;
}) => {
  return (
    <BasePort
      port={port}
      {...rest}
      datasets={{
        "data-blue-map-port": true,
        "data-blue-map-port-type": blueMapPort.config.type,
        "data-blue-map-port-io-type": port.group,
      }}
    >
      {children}
    </BasePort>
  );
};
