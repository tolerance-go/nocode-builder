import { BlueMapPortComponentProps } from "@/types/common";
import { BaseBlueMapPort } from "../BaseBlueMapPort";
import { FlowPort } from "../FlowPort";
import { ConditionPortConfig } from "./config";

export const ConditionPort = (props: BlueMapPortComponentProps) => {
  const { blueMapPort, ...portProps } = props;
  return (
    <BaseBlueMapPort {...props}>
      <FlowPort
        {...portProps}
        label={blueMapPort.args?.text}
        iconColor={ConditionPortConfig.edgeConfig.color}
        connectedIcon={
          <svg
            className={"text-xl relative"}
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.42593 18.8519C12.9749 18.8519 15.8519 15.9749 15.8519 12.4259C15.8519 8.87698 12.9749 6 9.42593 6C5.87698 6 3 8.87698 3 12.4259C3 15.9749 5.87698 18.8519 9.42593 18.8519Z"
              fill={ConditionPortConfig.edgeConfig.color}
            />
            <path
              d="M20.35 12.4259L15.8518 8.57038L16.4944 12.4259L15.8518 16.2815L20.35 12.4259Z"
              fill={ConditionPortConfig.edgeConfig.color}
            />
          </svg>
        }
        unconnectedIcon={
          <svg
            className={"text-xl relative"}
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.42593 18.8519C12.9749 18.8519 15.8519 15.9749 15.8519 12.4259C15.8519 8.87698 12.9749 6 9.42593 6C5.87698 6 3 8.87698 3 12.4259C3 15.9749 5.87698 18.8519 9.42593 18.8519Z"
              fill={ConditionPortConfig.edgeConfig.color}
            />
            <path
              d="M20.35 12.4259L15.8518 8.57038L16.4944 12.4259L15.8518 16.2815L20.35 12.4259Z"
              fill={ConditionPortConfig.edgeConfig.color}
            />
          </svg>
        }
      />
    </BaseBlueMapPort>
  );
};
