import useLatest from "@/hooks/useLatest";
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
import { Graph, Markup } from "@antv/x6";
import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import { SearchNodeShape } from "./components/nodes/SearchNode/config";
import { blueMapRawNodeConfigsById } from "./configs/configs";
import { blueMapEventBus } from "../../../../globals/blueMapEventBus";
import stores from "../../../../stores/blueMap";
import { SearchNodeSourceData } from "./types/blueMap";
import { getBlueMapPortMetaByPortId } from "./utils/getBlueMapPortMetaByPortId";
import { getNodeById } from "./utils/getNodeById";
import { validatePortConnection } from "./utils/validatePortConnection";
import { removePortConnections } from "./utils/removePortConnections";
import { connectAnchorOffset } from "./constants";
import X6Graph from "./Graph";
import { CustomRouterArgs } from "@/globals/register/registerRouter";
import "@/globals/register";

const BlueMap = () => {
  const [graph, setGraph] = useState<Graph | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const removeSearchNode = () => {
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
  const graphRef = useLatest(graph);

  const handleGraphInit = useCallback(
    (graph: Graph) => {
      setGraph(graph);

      // 加载图表数据
      function loadGraphData() {
        const data = localStorage.getItem("graphData");
        if (data) {
          graph.fromJSON(JSON.parse(data));
          console.log("Graph data loaded:", JSON.parse(data));
        } else {
          console.log("No graph data found.");
        }
      }

      function saveGraphData() {
        const data = graph.toJSON();
        localStorage.setItem("graphData", JSON.stringify(data));
        console.log("Graph data saved:", data);
      }

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

      graph.on("cell:change", saveGraphData);
      graph.on("cell:added", saveGraphData);
      graph.on("cell:removed", saveGraphData);
      graph.on("node:moved", saveGraphData);
      graph.on("edge:moved", saveGraphData);

      graph.on("edge:connected", () => {
        blueMapEventBus.emit("dragBlueMapPortEnd", undefined);
      });

      loadGraphData();
    },
    [removeSearchNodeRef]
  );

  const handleZoomIn = () => {
    graph?.zoom(0.1);
  };

  const handleZoomOut = () => {
    graph?.zoom(-0.1);
  };

  const handleZoomTo = () => {
    graph?.zoomTo(1);
  };

  const handleZoomToFit = () => {
    graph?.zoomToFit();
  };

  const handleCenterContent = () => {
    graph?.centerContent();
  };

  const handleUndo = () => {
    graph?.undo();
  };

  const handleRedo = () => {
    graph?.redo();
  };

  useEffect(() => {
    return blueMapEventBus.on(
      "selectBlueMapSearchPanelItem",
      ({ configId }) => {
        const graph = graphRef.current;
        if (graph) {
          const config = blueMapRawNodeConfigsById.get(configId);

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
      <X6Graph onGraphInit={handleGraphInit}></X6Graph>
    </div>
  );
};

export default BlueMap;
