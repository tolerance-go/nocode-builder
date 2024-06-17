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
import "./components/register";
import X6Graph from "./components/x6/X6Graph";
import { findNodeConfig } from "./utils/findNodeConfig";

const BlueMap = () => {
  const [graph, setGraph] = useState<Graph | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const removeSearchNode = () => {
    /** 回撤的过程中，可能出现多个 search node 同时出现的情况 */
    const allNodes = graph?.getNodes();
    allNodes?.forEach((node) => {
      if (node.shape === "search-node") {
        graph?.removeCell(node);
      }
    });
  };

  const removeSearchNodeRef = useLatest(removeSearchNode);
  const graphRef = useLatest(graph);

  const handleGraphInit = useCallback(
    (graph: Graph) => {
      setGraph(graph);

      graph.on("blank:contextmenu", ({ e }) => {
        e.preventDefault();

        // 将屏幕坐标转换为图形的局部坐标
        const { x, y } = graph.clientToLocal({ x: e.clientX, y: e.clientY });

        // 先取消上个 search-node
        removeSearchNodeRef.current();

        // 创建新的 search-node
        graph.addNode({
          shape: "search-node",
          x,
          y,
        });
      });

      graph.on("edge:mouseup", () => {
        removeSearchNodeRef.current();
      });

      graph.on("node:mouseup", ({ node }) => {
        if (node.shape !== "search-node") {
          removeSearchNodeRef.current();
        }
      });

      // 在空白处点击时，删除当前存在的 search-node
      graph.on("blank:mouseup", () => {
        removeSearchNodeRef.current();
      });

      graph.on("history:change", () => {
        console.log("history:change");
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
          (node) => node.shape === "search-node"
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
