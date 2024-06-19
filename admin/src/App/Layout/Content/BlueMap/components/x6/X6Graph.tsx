import { ensure } from "@/utils/ensure";
import { Graph, Shape } from "@antv/x6";
import { History } from "@antv/x6-plugin-history";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Selection } from "@antv/x6-plugin-selection";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { blueMapPortConfigsByType } from "../../configs/configs";
import { SearchNodeShape } from "../nodes/SearchNode/config";
import colors from "tailwindcss/colors";
import { BlueMapPortCommonArgs } from "../../types";

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
        connecting: {
          router: {
            name: "er",
            args: {
              direction: "H",
            },
          },
          connector: {
            name: "rounded",
          },
          // allowPort() {
          //   return false;
          // },
          // validateMagnet() {
          //   return false;
          // }
          createEdge({ sourceMagnet }) {
            const portTypeElements = sourceMagnet.querySelectorAll(
              "[data-blue-map-port-type]"
            );

            ensure(
              portTypeElements.length && portTypeElements.length < 2,
              "[data-blue-map-port-type] 标记不正确。"
            );

            const portType = portTypeElements[0].getAttribute(
              "data-blue-map-port-type"
            );

            ensure(typeof portType === "string", "portType 必须存在。");

            const config = blueMapPortConfigsByType.get(portType);

            ensure(config, "config 必须存在。");

            const strokeColor = config.edgeConfig.color;

            return new Shape.Edge({
              attrs: {
                line: {
                  targetMarker: null,
                  strokeLinecap: "round",
                  stroke: strokeColor, // 根据 portType 设置线的颜色
                  strokeWidth: 2,
                },
              },
            });
          },
        },
        interacting: {
          nodeMovable(cellView) {
            if (cellView.cell.shape === SearchNodeShape.shape) {
              return false;
            }
            return true;
          },
          // magnetConnectable(cellView) {
          //   return false;
          // },
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
          const container = args.contentSelectors?.foContent;
          if (container) {
            const blueMapPort = args.port.attrs?.blueMapPort;
            ensure(blueMapPort, "blueMapPort 必须存在。");
            const blueMapPortType = blueMapPort.type;

            ensure(
              typeof blueMapPortType === "string",
              "blueMapPortType 必须存在。"
            );
            const blueMapPortConfig =
              blueMapPortConfigsByType.get(blueMapPortType);
            ensure(blueMapPortConfig, "blueMapPortConfig 必须存在。");

            const blueMapPortArgs = blueMapPort.args as
              | BlueMapPortCommonArgs
              | undefined;

            ReactDOM.createRoot(container as HTMLElement).render(
              React.createElement(blueMapPortConfig.component, {
                node: args.node,
                port: args.port,
                graph,
                blueMapPort: {
                  config: blueMapPortConfig,
                  args: blueMapPortArgs,
                },
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
          showNodeSelectionBox: true, // 显示节点选择框
          eventTypes: ["leftMouseDown"], // 触发选择操作的事件类型，这里设置为鼠标左键按下
          filter(cell) {
            return cell.shape !== SearchNodeShape.shape; // 过滤器，排除 shape 类型为 "search-node" 的节点不被选择
          },
        })
      );

      graph.use(
        new History({
          enabled: true,
        })
      );

      graph.use(
        new Keyboard({
          enabled: true,
          global: true,
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
