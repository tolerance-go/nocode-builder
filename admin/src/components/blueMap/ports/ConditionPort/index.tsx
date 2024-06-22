import { BlueMapPortComponentProps } from "../../../../../../../types/blueMap";
import { DataPort } from "../DataPort";
import { BaseBlueMapPort } from "../BaseBlueMapPort";
import { ConditionPortConfig } from "./config";

export const ConditionPort = (props: BlueMapPortComponentProps) => {
  const { blueMapPort, ...portProps } = props;
  return (
    <BaseBlueMapPort {...props}>
      <DataPort
        {...portProps}
        label={blueMapPort.args?.text}
        iconColor={ConditionPortConfig.edgeConfig.color}
      />
    </BaseBlueMapPort>
  );
};
