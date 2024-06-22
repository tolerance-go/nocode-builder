import { BlueMapPortComponentProps } from "../../../../types";
import { AttrPort } from "../../../flows/ports/AttrPort";
import { BaseBlueMapPort } from "../BaseBlueMapPort";

export const ConditionPort = (props: BlueMapPortComponentProps) => {
  const { blueMapPort, ...portProps } = props;
  return (
    <BaseBlueMapPort {...props}>
      <AttrPort {...portProps} label={blueMapPort.args?.text} />
    </BaseBlueMapPort>
  );
};
