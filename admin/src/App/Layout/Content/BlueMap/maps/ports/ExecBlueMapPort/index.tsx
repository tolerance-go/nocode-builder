import colors from "tailwindcss/colors";
import { ArrowPort } from "../../../components/ports/ArrowPort";
import { BlueMapPortComponentProps } from "../../../types";
import { BaseBlueMapPort } from "../BaseBlueMapPort";

export const ExecBlueMapPort = (props: BlueMapPortComponentProps) => {
  const { blueMapPort, ...portProps } = props;
  return (
    <BaseBlueMapPort {...props}>
      <ArrowPort
        connectedIconColor={colors.gray[900]}
        unConnectedIconColor={colors.gray[400]}
        {...portProps}
        label={blueMapPort.args?.text}
      />
    </BaseBlueMapPort>
  );
};
