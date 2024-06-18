import { RightCircleFilled } from "@ant-design/icons";
import { ReactPortComponentProps } from "../../../types";
import { BasePort } from "../BasePort";
import { useEffect, useState } from "react";
import { Edge } from "@antv/x6";

export const ArrowPort = (props: ReactPortComponentProps) => {
  const { node, port, graph } = props;
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnections = () => {
      const edges: Edge[] = graph.getConnectedEdges(node);
      const connected = edges.some((edge: Edge) => {
        const sourcePortId = edge.getSourcePortId();
        const targetPortId = edge.getTargetPortId();
        return sourcePortId === port.id || targetPortId === port.id;
      });
      setIsConnected(connected);
    };

    checkConnections();

    // Optionally, you can add listeners for connection events if needed
    const handleChange = () => checkConnections();

    graph
      .on("edge:connected", handleChange)
      .on("edge:disconnected", handleChange);
    return () => {
      graph
        .off("edge:connected", handleChange)
        .off("edge:disconnected", handleChange);
    };
  }, [graph, node, port.id]);

  return (
    <BasePort {...props}>
      <RightCircleFilled style={{ color: isConnected ? "green" : "red" }} />
    </BasePort>
  );
};
