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
        connectedIcon={
          <svg
            style={{
              color: ExecPortConfig.edgeConfig.color,
            }}
            className={"text-xl relative"}
            focusable="false"
            data-icon="caret-right"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.6529 11.4219L8.55392 1.45625C8.19582 1.16129 7.74631 1 7.28237 1H4C3.5 1 3 1.6875 3 2.375V21.625C3 22.3125 3.5 23 4 23H7.28237C7.74631 23 8.19582 22.8387 8.55392 22.5438L20.6529 12.5781C21.1157 12.2844 21.1157 11.7157 20.6529 11.4219Z"
              fill="black"
            />
          </svg>
        }
        unconnectedIcon={
          <svg
            style={{
              color: ExecPortConfig.edgeConfig.color,
            }}
            className={"text-xl relative"}
            focusable="false"
            data-icon="caret-right"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.6529 11.4219L8.55392 1.45625C8.19582 1.16129 7.74631 1 7.28237 1H4C3.5 1 3 1.6875 3 2.375V21.625C3 22.3125 3.5 23 4 23H7.28237C7.74631 23 8.19582 22.8387 8.55392 22.5438L20.6529 12.5781C21.1157 12.2844 21.1157 11.7157 20.6529 11.4219Z"
              stroke="black"
              stroke-width="1.5"
            />
          </svg>
        }
      />
    </BaseBlueMapPort>
  );
};
