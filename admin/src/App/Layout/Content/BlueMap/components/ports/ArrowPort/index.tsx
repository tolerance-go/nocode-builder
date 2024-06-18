import { RightCircleFilled } from "@ant-design/icons";
import { ReactPortComponentProps } from "../../../types";
import { BasePort } from "../BasePort";

export const ArrowPort = (props: ReactPortComponentProps) => {
  return (
    <BasePort {...props}>
      <RightCircleFilled />
    </BasePort>
  );
};
