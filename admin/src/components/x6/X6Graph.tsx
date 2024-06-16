import { Graph } from "@antv/x6";
import { memo, useEffect, useRef } from "react";

interface X6GraphProps {
  onGraphInit?: (graph: Graph) => void;
}

const X6Graph = memo(({ onGraphInit }: X6GraphProps) => {
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
        grid: {
          visible: true,
          type: "doubleMesh",
          args: [
            {
              color: "#eee", // 主网格线颜色
              thickness: 1, // 主网格线宽度
            },
            {
              color: "#ddd", // 次网格线颜色
              thickness: 1, // 次网格线宽度
              factor: 4, // 主次网格线间隔
            },
          ],
        },
      });

      graphRef.current = graph;
      if (onGraphInit) {
        onGraphInit(graph);
      }

      const resizeObserver = new ResizeObserver(resizeGraph);
      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
        graph.dispose();
        graphRef.current = null;
      };
    }
  }, [onGraphInit]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}></div>
  );
});

export default X6Graph;
