import colors from "tailwindcss/colors";
import { ArrowPort } from "../../../components/flows/ports/ArrowPort";
import { BlueMapPortComponentProps } from "../../../types";
import { BaseBlueMapPort } from "../BaseBlueMapPort";
import { ExecBlueMapPortConfig } from "./config";

export const ExecBlueMapPort = (props: BlueMapPortComponentProps) => {
  const { blueMapPort, ...portProps } = props;
  return (
    <BaseBlueMapPort {...props}>
      <ArrowPort
        connectedIconColor={ExecBlueMapPortConfig.edgeConfig.color}
        unConnectedIconColor={colors.gray[400]}
        {...portProps}
        label={blueMapPort.args?.text}
      />
    </BaseBlueMapPort>
  );
};
