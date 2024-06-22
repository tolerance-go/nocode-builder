import { BlueMapPortComponentProps } from "../../../../types";
import { SignalPort } from "../../../flows/ports/SignalPort";
import { BaseBlueMapPort } from "../BaseBlueMapPort";

export const ConditionPort = (props: BlueMapPortComponentProps) => {
  const { blueMapPort, ...portProps } = props;
  return (
    <BaseBlueMapPort {...props}>
      <SignalPort {...portProps} label={blueMapPort.args?.text} />
    </BaseBlueMapPort>
  );
};
