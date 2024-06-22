import { BlueMapPortComponentProps } from "../../../../types";
import { ArrowPort } from "../../../flows/ports/ArrowPort";
import { BaseBlueMapPort } from "../BaseBlueMapPort";
import { ExecBlueMapPortConfig } from "./config";

export const ExecBlueMapPort = (props: BlueMapPortComponentProps) => {
  const { blueMapPort, ...portProps } = props;
  return (
    <BaseBlueMapPort {...props}>
      <ArrowPort
        iconColor={ExecBlueMapPortConfig.edgeConfig.color}
        {...portProps}
        label={blueMapPort.args?.text}
      />
    </BaseBlueMapPort>
  );
};
