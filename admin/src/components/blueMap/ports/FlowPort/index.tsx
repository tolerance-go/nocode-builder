import { Edge } from "@antv/x6";
import { cx } from "@emotion/css";
import { useEffect, useState } from "react";
import { BasePort } from "../BasePort";
import { ReactPortComponentProps } from "@/types/blueMap";

type FlowPortProps = ReactPortComponentProps & {
  label?: string;
  iconColor?: string;
  connectedIcon?: React.ReactNode;
  unconnectedIcon?: React.ReactNode;
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
      icon={isConnected ? props.connectedIcon : props.unconnectedIcon}
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
