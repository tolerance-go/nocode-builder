import { SearchNodeShape } from "@/components/blueMap/nodes/SearchNode/config";
import { CustomRouterArgs } from "@/globals/register/registerRouter";
import useLatest from "@/hooks/useLatest";
import { getBlueMapPortMetaByPortId } from "@/utils/blueMap/getBlueMapPortMetaByPortId";
import { getNodeById } from "@/utils/blueMap/getNodeById";
import { removePortConnections } from "@/utils/blueMap/removePortConnections";
import { validatePortConnection } from "@/utils/blueMap/validatePortConnection";
import { ensure } from "@/utils/ensure";
import {
  AimOutlined,
  FullscreenOutlined,
  RedoOutlined,
  ShrinkOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Graph, Markup, Shape } from "@antv/x6";
import { History } from "@antv/x6-plugin-history";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Selection } from "@antv/x6-plugin-selection";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { nodeConfigsById } from "../../../../configs/blueMap/configs";
import { connectAnchorOffset } from "../../../../constants/blueMap";
import { blueMapEventBus } from "../../../../globals/blueMapEventBus";
import stores from "../../../../stores/blueMap";
import {
  BlueMapPortCommonArgs,
  PortBlueMapAttrs,
  SearchNodeSourceData,
} from "../../../../types/blueMap";
import { blueMapPortConfigsByType } from "@/configs/blueMap/blueMapPortConfigs";
import "@/globals/register";

const BlueMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const graphRef = useRef<Graph>();

  const removeSearchNode = () => {
    const graph = graphRef.current;
    ensure(graph, "graph 必须存在。");

    /** 回撤的过程中，可能出现多个 search node 同时出现的情况 */
    const allNodes = graph.getNodes();
    graph.batchUpdate(() => {
      allNodes?.forEach((node) => {
        if (node.shape === SearchNodeShape.shape) {
          graph.removeCell(node);
          const edgeId = node.getPropByPath("edge/id");
          if (typeof edgeId === "string") {
            // 删除关联的线
            graph.removeEdge(edgeId);
          }
        }
      });

      stores.search.actions.clearSearchNodeSourcePort();
    });
  };

  const removeSearchNodeRef = useLatest(removeSearchNode);

  const handleZoomIn = () => {
    graphRef.current?.zoom(0.1);
  };

  const handleZoomOut = () => {
    graphRef.current?.zoom(-0.1);
  };

  const handleZoomTo = () => {
    graphRef.current?.zoomTo(1);
  };

  const handleZoomToFit = () => {
    graphRef.current?.zoomToFit();
  };

  const handleCenterContent = () => {
    graphRef.current?.centerContent();
  };

  const handleUndo = () => {
    graphRef.current?.undo();
  };

  const handleRedo = () => {
    graphRef.current?.redo();
  };

  useEffect(() => {
    if (containerRef.current) {
      const resizeGraph = () => {
        if (containerRef.current && graphRef.current) {
          graphRef.current.resize(
            containerRef.current.clientWidth,
            containerRef.current.clientHeight
          );
        }
      };

      const container = containerRef.current;

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

              blueMapEventBus.emit("draggingBlueMapPort", {
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
                zIndex: -1,
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
                    args: {
                      dx:
                        group === "right"
                          ? -connectAnchorOffset
                          : connectAnchorOffset,
                    },
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
                    args: {
                      dx:
                        port?.group === "right"
                          ? -connectAnchorOffset
                          : connectAnchorOffset,
                    },
                  },
                });
              }
            }
          }
        }
      );

      /** 重复连线删除 */
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

      graph.on("node:added", ({ node }) => {
        node.setZIndex(1);
      });

      graph.on("edge:added", ({ edge }) => {
        edge.setZIndex(-1);
      });

      graph.on("blank:contextmenu", ({ e }) => {
        e.preventDefault();

        // 将屏幕坐标转换为图形的局部坐标
        const { x, y } = graph.clientToLocal({ x: e.clientX, y: e.clientY });

        // 先取消上个 search-node
        removeSearchNodeRef.current();

        // 创建新的 search-node
        graph.addNode({
          shape: SearchNodeShape.shape,
          x,
          y,
        });
      });

      graph.on("edge:mouseup", () => {
        removeSearchNodeRef.current();
      });

      graph.on("node:mouseup", ({ node }) => {
        if (node.shape !== SearchNodeShape.shape) {
          removeSearchNodeRef.current();
        }
      });

      // 在空白处点击时，删除当前存在的 search-node
      graph.on("blank:mouseup", () => {
        removeSearchNodeRef.current();
      });

      graph.on("history:change", () => {
        setCanUndo(graph.canUndo());
        setCanRedo(graph.canRedo());
      });

      // 绑定撤销和重做快捷键
      graph.bindKey(["ctrl+z", "command+z"], () => {
        console.log("ctrl+z");
        graph.undo();
      });

      graph.bindKey(["ctrl+shift+z", "command+shift+z"], () => {
        graph.redo();
      });

      graph.bindKey(["delete", "backspace"], () => {
        graph.getSelectedCells().forEach((cell) => cell.remove());
      });

      // 监听 edge:connected 事件
      graph.on("edge:mouseup", ({ edge, e }) => {
        const targetPort = edge.getTargetPortId();
        const targetCell = edge.getTargetCell();

        // 如果没有连接到任何目标节点，则创建一个 search-node
        if (!targetPort && !targetCell) {
          const sourceNode = edge.getSourceNode();
          const sourcePortId = edge.getSourcePortId();

          ensure(
            sourceNode && sourcePortId,
            "sourceNode && sourcePortId 参数必须存在。"
          );

          const { x, y } = graph.clientToLocal({
            x: e.clientX,
            y: e.clientY,
          });
          const searchNode = graph.addNode({
            shape: SearchNodeShape.shape,
            x,
            y,
          });
          searchNode.setPropByPath("edge/id", edge.id);
          const searchNodeSourceData: SearchNodeSourceData = {
            nodeId: sourceNode.id,
            portId: sourcePortId,
          };
          searchNode.setPropByPath("source", searchNodeSourceData);
          stores.search.actions.setSearchNodeSourcePort(
            sourceNode.id,
            sourcePortId
          );

          blueMapEventBus.emit("dragBlueMapPortEnd", undefined);
        }
      });

      // 加载图表数据
      const loadGraphData = () => {
        const data = localStorage.getItem("graphData");
        if (data) {
          graph.fromJSON(JSON.parse(data));
          console.log("Graph data loaded:", JSON.parse(data));
        } else {
          console.log("No graph data found.");
        }
      };

      const saveGraphData = () => {
        const data = graph.toJSON();
        localStorage.setItem("graphData", JSON.stringify(data));
        console.log("Graph data saved:", data);
      };

      graph.on("cell:change", saveGraphData);
      graph.on("cell:added", saveGraphData);
      graph.on("cell:removed", saveGraphData);
      graph.on("node:moved", saveGraphData);
      graph.on("edge:moved", saveGraphData);

      graph.on("edge:connected", () => {
        blueMapEventBus.emit("dragBlueMapPortEnd", undefined);
      });

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

      loadGraphData();

      return () => {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mouseup", handleMouseUp);

        resizeObserver.disconnect();
        graph.dispose();
        graphRef.current = undefined;
      };
    }
  }, [graphRef, removeSearchNodeRef]);

  useEffect(() => {
    return blueMapEventBus.on(
      "selectBlueMapSearchPanelItem",
      ({ configId }) => {
        const graph = graphRef.current;
        if (graph) {
          const config = nodeConfigsById.get(configId);

          ensure(config, "config 必须存在。");

          const allNodes = graph.getNodes();
          const searchNode = allNodes?.find(
            (node) => node.shape === SearchNodeShape.shape
          );

          ensure(searchNode, "searchNode 必须存在。");

          const { x, y } = searchNode.getPosition();

          /** 先取出来缓存 */
          const source = stores.search.states.searchNodeSourcePort.source;

          removeSearchNodeRef.current();

          graph.batchUpdate(() => {
            const target = graph.addNode({
              shape: config.shapeName,
              x,
              y,
              ports: config.ports,
              portMarkup: [Markup.getForeignObjectMarkup()],
              attrs: config.attrs,
            });

            if (source) {
              const { nodeId, portId } = source;
              // 找到源节点的蓝图配置和蓝图 port 配置
              const sourceNode = getNodeById(nodeId, graph);
              // const sourceBlueMapNodeConfig = getBlueMapNodeConfigByNodeId(
              //   nodeId,
              //   graph
              // );
              const {
                blueMapPortConfig: sourceBlueMapPortConfig,
                portBlueMapAttrs: sourcePortBlueMapAttrs,
              } = getBlueMapPortMetaByPortId(portId, sourceNode);

              /**
               * 准备往 target 上连线
               * 找到 target 上所有的 port
               * 然后根据 source 的 to 的约束
               * 找到所有合法的 port，然后取第一个，创建一个连线从 source 到 target
               */

              const targetPorts = target.getPorts();
              const validPorts = targetPorts.filter((targetPort) => {
                return validatePortConnection({
                  sourceNode: sourceNode,
                  sourcePortId: portId,
                  targetPortId: targetPort.id!,
                  targetNode: target,
                });
              });

              if (validPorts.length > 0) {
                // 删除之前存在的连线
                if (
                  sourceBlueMapPortConfig.type === "exec" &&
                  sourcePortBlueMapAttrs.ioType === "output"
                ) {
                  removePortConnections(source.nodeId, source.portId, graph);
                }

                const routerArgs: CustomRouterArgs = {
                  sourceSide:
                    sourcePortBlueMapAttrs.ioType === "output"
                      ? "right"
                      : "left",
                  targetSide:
                    sourcePortBlueMapAttrs.ioType === "output"
                      ? "left"
                      : "right",
                  // offset: 50, // 自定义的偏移值
                  // verticalOffset: 10, // 自定义的纵向偏移值
                };

                graph.addEdge({
                  attrs: {
                    line: {
                      targetMarker: null,
                      strokeLinecap: "round",
                      stroke: sourceBlueMapPortConfig.edgeConfig.color, // 根据 portType 设置线的颜色
                      strokeWidth:
                        sourceBlueMapPortConfig.edgeConfig.strokeWidth,
                    },
                  },
                  router: {
                    name: "custom",
                    args: routerArgs,
                  },
                  source: {
                    cell: sourceNode.id,
                    port: portId,
                    anchor: {
                      name:
                        sourcePortBlueMapAttrs.ioType === "output"
                          ? "right"
                          : "left",
                      args: {
                        dx:
                          sourcePortBlueMapAttrs.ioType === "output"
                            ? -connectAnchorOffset
                            : connectAnchorOffset,
                      },
                    },
                  },
                  target: {
                    cell: target.id,
                    port: validPorts[0].id,
                    anchor: {
                      name: validPorts[0].group === "right" ? "right" : "left",
                      args: {
                        dx:
                          validPorts[0].group === "right"
                            ? -connectAnchorOffset
                            : connectAnchorOffset,
                      },
                    },
                  },
                });
              }
            }
          });
        }
      }
    );
  }, [removeSearchNodeRef, graphRef]);

  return (
    <div className="h-[100%] relative">
      <div className="absolute bottom-5 right-5 z-10 flex space-x-2">
        <Button icon={<ZoomInOutlined />} onClick={handleZoomIn} />
        <Button icon={<ZoomOutOutlined />} onClick={handleZoomOut} />
        <Button icon={<ShrinkOutlined />} onClick={handleZoomTo} />
        <Button icon={<FullscreenOutlined />} onClick={handleZoomToFit} />
        <Button icon={<AimOutlined />} onClick={handleCenterContent} />
        <Button
          icon={<UndoOutlined />}
          onClick={handleUndo}
          disabled={!canUndo}
        />
        <Button
          icon={<RedoOutlined />}
          onClick={handleRedo}
          disabled={!canRedo}
        />
      </div>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", cursor: "default" }}
      ></div>
    </div>
  );
};

export default BlueMap;
