import { ArrowPort } from "../../../components/ports/ArrowPort";
import { BlueMapPortComponentProps } from "../../../types";
import { BaseBlueMapPort } from "../BaseBlueMapPort";

export const ExecBlueMapPort = (props: BlueMapPortComponentProps) => {
  const { blueMapPort, ...portProps } = props;
  return (
    <BaseBlueMapPort {...props}>
      <ArrowPort {...portProps} label={blueMapPort.args?.text} />;
    </BaseBlueMapPort>
  );
};
