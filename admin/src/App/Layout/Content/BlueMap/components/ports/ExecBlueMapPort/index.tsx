import { BlueMapPortComponentProps } from "../../../types";
import { FlowPort } from "../FlowPort";
import { BaseBlueMapPort } from "../BaseBlueMapPort";
import { ExecBlueMapPortConfig } from "./config";

export const ExecBlueMapPort = (props: BlueMapPortComponentProps) => {
  const { blueMapPort, ...portProps } = props;
  return (
    <BaseBlueMapPort {...props}>
      <FlowPort
        iconColor={ExecBlueMapPortConfig.edgeConfig.color}
        {...portProps}
        label={blueMapPort.args?.text}
      />
    </BaseBlueMapPort>
  );
};
