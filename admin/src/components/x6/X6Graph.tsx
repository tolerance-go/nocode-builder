import { Graph } from "@antv/x6";
import { memo, useEffect, useRef } from "react";
import { Selection } from "@antv/x6-plugin-selection";

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
        mousewheel: {
          enabled: true,
          factor: 1.1,
          zoomAtMousePosition: true,
        },
        panning: {
          enabled: true,
          eventTypes: ["mouseWheelDown"],
        },
      });

      graphRef.current = graph;

      graph.use(
        new Selection({
          enabled: true,
          multiple: true,
          rubberband: true,
          movable: true,
          showNodeSelectionBox: true,
          eventTypes: ["leftMouseDown"],
          filter(cell) {
            return cell.shape !== "search-node";
          },
        })
      );

      if (onGraphInit) {
        onGraphInit(graph);
      }

      const container = containerRef.current;

      const handleMouseDown = (e: MouseEvent) => {
        if (e.button === 1) {
          // 检查是否按下鼠标中键
          container.style.cursor = "grabbing";
        }
      };

      const handleMouseUp = (e: MouseEvent) => {
        if (e.button === 1) {
          // 检查是否松开鼠标中键
          container.style.cursor = "default";
        }
      };

      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mouseup", handleMouseUp);

      const resizeObserver = new ResizeObserver(resizeGraph);
      resizeObserver.observe(containerRef.current);

      return () => {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mouseup", handleMouseUp);

        resizeObserver.disconnect();
        graph.dispose();
        graphRef.current = null;
      };
    }
  }, [onGraphInit]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", cursor: "default" }}
    ></div>
  );
});

export default X6Graph;
