import { RightSquareFilled } from "@ant-design/icons";
import { Edge } from "@antv/x6";
import { useEffect, useState } from "react";
import { ReactPortCommonArgs, ReactPortComponentProps } from "../../../types";
import { BasePort } from "../BasePort";

export const ArrowPort = (props: ReactPortComponentProps) => {
  const { node, port, graph } = props;
  const args = port.attrs?.port.args as ReactPortCommonArgs;

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
      <div className="h-[100%] flex justify-center items-center">
        {args.text}
        <RightSquareFilled
          style={{ color: isConnected ? "green" : "red", fontSize: 32 }}
        />
      </div>
    </BasePort>
  );
};
