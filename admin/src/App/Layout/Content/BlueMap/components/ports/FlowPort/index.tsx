import { Edge } from "@antv/x6";
import { cx } from "@emotion/css";
import { useEffect, useState } from "react";
import { ReactPortComponentProps } from "../../../types/blueMap";
import { BasePort } from "../BasePort";

type FlowPortProps = ReactPortComponentProps & {
  label?: string;
  iconColor?: string;
};

export const FlowPort = (props: FlowPortProps) => {
  const { node, port, graph, label } = props;

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnections = () => {
      const edges: Edge[] = graph.getConnectedEdges(node);
      const connected = edges.some((edge: Edge) => {
        const sourceNode = edge.getSourceNode();
        const targetNode = edge.getTargetNode();
        const sourcePortId = edge.getSourcePortId();
        const targetPortId = edge.getTargetPortId();

        // 如果 port.group 是 left，检查 edge 的 target 是不是这个 id，并且 sourceNode 不是当前 node
        if (port.group === "left") {
          return (
            (targetPortId === port.id &&
              sourceNode &&
              sourceNode.id !== node.id) ||
            (sourcePortId === port.id &&
              targetNode &&
              targetNode.id !== node.id)
          );
        }

        // 如果 port.group 是 right，检查 edge 的 source 是不是这个 id，并且 targetNode 不是当前 node
        if (port.group === "right") {
          return (
            (sourcePortId === port.id &&
              targetNode &&
              targetNode.id !== node.id) ||
            (targetPortId === port.id &&
              sourceNode &&
              sourceNode.id !== node.id)
          );
        }

        return false;
      });
      setIsConnected(connected);
    };

    checkConnections();

    // 可选地，可以添加连接事件的监听器
    const handleChange = () => checkConnections();

    graph
      .on("edge:added", handleChange)
      .on("edge:connected", handleChange)
      .on("edge:removed", handleChange)
      .on("edge:disconnected", handleChange);
    return () => {
      graph
        .off("edge:added", handleChange)
        .off("edge:connected", handleChange)
        .off("edge:removed", handleChange)
        .off("edge:disconnected", handleChange);
    };
  }, [graph, node, port.id, port.group]);

  return (
    <BasePort
      {...props}
      icon={
        isConnected ? (
          <svg
            style={{
              color: props.iconColor,
            }}
            className={"text-2xl relative"}
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
        ) : (
          <svg
            style={{
              color: props.iconColor,
            }}
            className={"text-2xl relative"}
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
        )
      }
    >
      {({ icon }) => {
        return (
          <div
            className={cx(
              "h-[100%] flex items-center justify-start gap-1",
              port.group === "left" ? "flex-row" : "flex-row-reverse"
            )}
          >
            {icon}
            {label && <span className="text-base">{label}</span>}
          </div>
        );
      }}
    </BasePort>
  );
};
