import React, { useEffect, useRef } from "react";
import { Graph } from "@antv/x6";

interface X6GraphProps {
  onGraphInit?: (graph: Graph) => void;
}

const X6Graph: React.FC<X6GraphProps> = ({ onGraphInit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    const resizeGraph = () => {
      if (containerRef.current && graphRef.current) {
        graphRef.current.resize(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight
        );
      }
    };

    if (containerRef.current) {
      const graph = new Graph({
        container: containerRef.current,
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
        grid: true,
      });

      graphRef.current = graph;
      if (onGraphInit) {
        onGraphInit(graph);
      }

      const resizeObserver = new ResizeObserver(resizeGraph);
      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default X6Graph;
