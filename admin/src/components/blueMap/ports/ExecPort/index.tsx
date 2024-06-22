import { FlowPort } from "../FlowPort";
import { BaseBlueMapPort } from "../BaseBlueMapPort";
import { ExecPortConfig } from "./config";
import { BlueMapPortComponentProps } from "@/types/blueMap";

export const ExecPort = (props: BlueMapPortComponentProps) => {
  const { blueMapPort, ...portProps } = props;
  return (
    <BaseBlueMapPort {...props}>
      <FlowPort
        iconColor={ExecPortConfig.edgeConfig.color}
        {...portProps}
        label={blueMapPort.args?.text}
      />
    </BaseBlueMapPort>
  );
};
