import { BlueMapPortComponentProps } from "../../../../types";
import { DataPort } from "../../../flows/ports/DataPort";
import { BaseBlueMapPort } from "../BaseBlueMapPort";

export const ConditionPort = (props: BlueMapPortComponentProps) => {
  const { blueMapPort, ...portProps } = props;
  return (
    <BaseBlueMapPort {...props}>
      <DataPort {...portProps} label={blueMapPort.args?.text} />
    </BaseBlueMapPort>
  );
};
