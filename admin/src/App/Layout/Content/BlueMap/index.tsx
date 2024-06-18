import { globalEventBus } from "@/globals/eventBus";
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
import { Cell, Graph, Markup } from "@antv/x6";
import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import "./globals/register";
import X6Graph from "./components/x6/X6Graph";
import { findNodeConfig } from "./utils/findNodeConfig";
import { SearchNodeShape } from "./components/nodes/SearchNode/config";

const BlueMap = () => {
  const [graph, setGraph] = useState<Graph | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const removeSearchNode = () => {
    /** 回撤的过程中，可能出现多个 search node 同时出现的情况 */
    const allNodes = graph?.getNodes();
    allNodes?.forEach((node) => {
      if (node.shape === SearchNodeShape.shape) {
        graph?.removeCell(node);
      }
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
          const { x, y } = graph.clientToLocal({ x: e.clientX, y: e.clientY });
          graph.addNode({
            shape: SearchNodeShape.shape,
            x,
            y,
          });
        }
      });

      graph.on("cell:change", saveGraphData);
      graph.on("cell:added", saveGraphData);
      graph.on("cell:removed", saveGraphData);
      graph.on("node:moved", saveGraphData);
      graph.on("edge:moved", saveGraphData);

      loadGraphData();

      return () => {
        graph.dispose();
      };
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
    return globalEventBus.on("selectBlueMapSearchPanelItem", ({ configId }) => {
      if (graphRef.current) {
        const config = findNodeConfig(configId);
        const allNodes = graphRef.current.getNodes();
        const searchNode = allNodes?.find(
          (node) => node.shape === SearchNodeShape.shape
        );

        ensure(!!searchNode, "searchNode 必须存在。");

        const { x, y } = (searchNode as Cell).getProp("position");

        removeSearchNodeRef.current();

        graphRef.current.addNode({
          shape: config.shape,
          x,
          y,
          ports: config.ports,
          portMarkup: [Markup.getForeignObjectMarkup()],
          attrs: config.attrs,
        });
      }
    });
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
