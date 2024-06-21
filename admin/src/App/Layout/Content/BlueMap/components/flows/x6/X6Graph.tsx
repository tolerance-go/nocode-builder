import { ensure } from "@/utils/ensure";
import { Graph, Shape } from "@antv/x6";
import { History } from "@antv/x6-plugin-history";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Selection } from "@antv/x6-plugin-selection";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { CustomRouterArgs } from "../../../globals/register/registerRouter";
import { BlueMapPortCommonArgs, PortBlueMapAttrs } from "../../../types";
import { validatePortConnection } from "../../../utils/validatePortConnection";
import { SearchNodeShape } from "../nodes/SearchNode/config";
import { blueMapPortConfigsByType } from "../../../configs/blueMapPortConfigs";
import { globalEventBus } from "@/globals/eventBus";

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
          sourceAnchor: {
            name: "right",
          },
          targetAnchor: {
            name: "left",
            args: {},
          },
          connectionPoint: "anchor",
          router: {
            name: "custom",
          },
          connector: {
            name: "rounded",
            args: {
              radius: 20,
            },
          },
          allowNode: false,
          // allowPort() {
          //   return false;
          // },
          // validateMagnet({ cell, magnet, e }) {
          //   console.log(magnet);
          //   return true;
          // },
          // 是否允许边链接到连接桩，默认为 true 。
          allowPort({
            type,
            targetPort: targetPortId,
            targetCell,
            sourceCell,
            sourcePort: sourcePortId,
          }) {
            /** 从 port 创建连线向外寻找目标连接触发 */
            if (type === "target") {
              if (
                sourceCell?.isNode() &&
                targetCell?.isNode() &&
                targetPortId &&
                sourcePortId
              ) {
                return validatePortConnection({
                  sourceNode: sourceCell,
                  sourcePortId,
                  targetPortId,
                  targetNode: targetCell,
                });
              }
            }

            return false;
          },
          createEdge({ sourceMagnet, sourceCell }) {
            if (sourceCell.isNode()) {
              const sourceNode = sourceCell;
              const portTypeElement = sourceMagnet.querySelector(
                "[data-blue-map-port]"
              );

              ensure(portTypeElement, "[data-blue-map-port] 标记不正确。");

              const blueMapPortType = portTypeElement.getAttribute(
                "data-blue-map-port-type"
              );

              const portId = portTypeElement.getAttribute("data-port-id");

              ensure(
                typeof blueMapPortType === "string",
                "blueMapPortType 必须存在。"
              );
              ensure(typeof portId === "string", "portId 必须存在。");

              const config = blueMapPortConfigsByType.get(blueMapPortType);

              ensure(config, "config 必须存在。");

              const strokeColor = config.edgeConfig.color;

              const group = portTypeElement.getAttribute("data-port-group");

              ensure(typeof group === "string", "group 必须存在。");

              globalEventBus.emit("draggingBlueMapPort", {
                sourceNodeId: sourceNode.id,
                sourcePortId: portId,
              });

              const routerArgs: CustomRouterArgs = {
                sourceSide: group === "right" ? "right" : "left",
                targetSide: group === "right" ? "left" : "right",
                // offset: 50, // 自定义的偏移值
                // verticalOffset: 10, // 自定义的纵向偏移值
              };

              return new Shape.Edge({
                attrs: {
                  line: {
                    targetMarker: null,
                    strokeLinecap: "round",
                    stroke: strokeColor, // 根据 portType 设置线的颜色
                    strokeWidth: config.edgeConfig.strokeWidth,
                  },
                },
                router: {
                  name: "custom",
                  args: routerArgs,
                },
                source: {
                  anchor: {
                    name: group === "right" ? "right" : "left",
                  },
                },
              });
            }
          },
        },
        interacting: {
          nodeMovable(cellView) {
            if (cellView.cell.shape === SearchNodeShape.shape) {
              return false;
            }
            return true;
          },
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
            const portBlueMapAttrs = args.port.attrs?.blueMap as
              | PortBlueMapAttrs
              | undefined;
            ensure(portBlueMapAttrs, "portBlueMapAttrs 必须存在。");
            const blueMapPortType = portBlueMapAttrs.type;

            ensure(
              typeof blueMapPortType === "string",
              "blueMapPortType 必须存在。"
            );
            const blueMapPortConfig =
              blueMapPortConfigsByType.get(blueMapPortType);
            ensure(blueMapPortConfig, "blueMapPortConfig 必须存在。");

            const blueMapPortArgs = portBlueMapAttrs.args as
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

      // graph.use(
      //   new Snapline({
      //     enabled: true,
      //     sharp: true,
      //   })
      // );

      graph.on(
        "edge:connected",
        ({ type, isNew, currentCell, currentPort, edge }) => {
          /**
           * 当从 port 拉出新的连线，连接到目标 port 时候
           */
          if (type === "target") {
            if (isNew && currentPort && currentCell?.isNode()) {
              const ports = currentCell.getPorts();

              const port = ports.find((port) => port.id === currentPort);

              if (port?.group) {
                edge.setTarget({
                  port: currentPort,
                  cell: currentCell.id,
                  anchor: {
                    name: port?.group === "right" ? "right" : "left",
                  },
                });
              }
            }
          }
        }
      );

      graph.on("edge:connected", ({ type, isNew, edge }) => {
        if (type === "target" && isNew) {
          const targetNode = edge.getTargetNode();
          const targetPortId = edge.getTargetPortId();
          const sourceNode = edge.getSourceNode();
          const sourcePortId = edge.getSourcePortId();

          if (targetNode && targetPortId && sourceNode && sourcePortId) {
            const existingEdges = graph.getEdges().filter((existingEdge) => {
              const existingTargetNode = existingEdge.getTargetNode();
              const existingTargetPortId = existingEdge.getTargetPortId();
              const existingSourceNode = existingEdge.getSourceNode();
              const existingSourcePortId = existingEdge.getSourcePortId();

              return (
                existingEdge !== edge &&
                ((existingTargetNode === targetNode &&
                  existingTargetPortId === targetPortId &&
                  existingSourceNode === sourceNode &&
                  existingSourcePortId === sourcePortId) ||
                  (existingTargetNode === sourceNode &&
                    existingTargetPortId === sourcePortId &&
                    existingSourceNode === targetNode &&
                    existingSourcePortId === targetPortId))
              );
            });

            // 删除已存在的其他连接
            existingEdges.forEach((existingEdge) => existingEdge.remove());
          }
        }
      });

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
