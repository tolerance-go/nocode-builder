import { ensure } from "@/utils/ensure";
import { Graph } from "@antv/x6";
import { Selection } from "@antv/x6-plugin-selection";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { ports } from "../ports";
import { portLabels } from "../portLabels";

interface X6GraphProps {
  onGraphInit?: (graph: Graph) => void;
}

const X6Graph = ({ onGraphInit }: X6GraphProps) => {
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
        onPortRendered(args) {
          const container = args.labelSelectors?.foContent;
          if (container) {
            const type = args.port.attrs?.portLabel.type;

            ensure(
              typeof type === "string",
              "port.attrs.portLabel.type 必须存在。"
            );

            const portLabelComp = portLabels[type];

            ensure(!!portLabelComp, "portLabelComp 没有对应组件。");

            ReactDOM.createRoot(container as HTMLElement).render(
              React.createElement(portLabelComp, {
                node: args.node,
                port: args.port,
              })
            );
          }
        },
      });

      graphRef.current = graph;

      graph.use(
        new Selection({
          enabled: true, // 启用选择插件
          multiple: true, // 允许多选
          rubberband: true, // 允许使用橡皮筋（框选）选择节点
          movable: true, // 允许移动选中的节点
          showNodeSelectionBox: false, // 显示节点选择框
          eventTypes: ["leftMouseDown"], // 触发选择操作的事件类型，这里设置为鼠标左键按下
          filter(cell) {
            return cell.shape !== "search-node"; // 过滤器，排除 shape 类型为 "search-node" 的节点不被选择
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
};

export default X6Graph;
