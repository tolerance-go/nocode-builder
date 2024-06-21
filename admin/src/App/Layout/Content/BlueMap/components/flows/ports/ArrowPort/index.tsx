import { CaretRightFilled } from "@ant-design/icons";
import { Edge } from "@antv/x6";
import { cx } from "@emotion/css";
import { useEffect, useState } from "react";
import { ReactPortComponentProps } from "../../../../types";
import { BasePort } from "../BasePort";

type ArrowPortProps = ReactPortComponentProps & {
  label?: string;
  connectedIconColor?: string;
  unConnectedIconColor?: string;
};

export const ArrowPort = (props: ArrowPortProps) => {
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
          <CaretRightFilled className={cx("text-3xl relative")} />
        ) : (
          <svg
            className={cx("text-3xl relative")}
            viewBox="0 0 1024 1024"
            focusable="false"
            data-icon="caret-right"
            width="1em"
            height="1em"
            fill="none"
            stroke="currentColor"
            stroke-width="60"
            aria-hidden="true"
          >
            <path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path>
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
            {label && <span className="text-lg">{label}</span>}
          </div>
        );
      }}
    </BasePort>
  );
};
