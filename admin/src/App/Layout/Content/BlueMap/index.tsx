import X6Graph from "@/components/x6/X6Graph";
import { globalEventBus } from "@/globals/eventBus";
import {
  AimOutlined,
  FullscreenOutlined,
  ShrinkOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Graph } from "@antv/x6";
import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import "./components/register";

let lastSearchNodeId: string | null = null;

const BlueMap = () => {
  const [graph, setGraph] = useState<Graph | null>(null);

  const handleGraphInit = useCallback((graph: Graph) => {
    setGraph(graph);

    // 在这里初始化图表，例如添加节点和边
    const rect = graph.addNode({
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: "Hello",
    });

    graph.addEdge({
      source: { cell: rect.id },
      target: { x: 160, y: 60 },
    });

    const removeSearchNode = () => {
      if (lastSearchNodeId) {
        const lastNode = graph.getCellById(lastSearchNodeId);
        if (lastNode) {
          graph.removeCell(lastNode);
          lastSearchNodeId = null;
        }
      }
    };

    graph.on("blank:contextmenu", ({ e }) => {
      e.preventDefault();

      // 将屏幕坐标转换为图形的局部坐标
      const { x, y } = graph.clientToLocal({ x: e.clientX, y: e.clientY });

      // 先取消上个 search-node
      if (lastSearchNodeId) {
        const lastNode = graph.getCellById(lastSearchNodeId);
        if (lastNode) {
          graph.removeCell(lastNode);
        }
      }

      // 创建新的 search-node
      const newNode = graph.addNode({
        shape: "search-node",
        x,
        y,
      });

      lastSearchNodeId = newNode.id;
    });

    graph.on("edge:mouseup", () => {
      removeSearchNode();
    });

    graph.on("node:mouseup", ({ node }) => {
      if (node.shape !== "search-node") {
        removeSearchNode();
      }
    });

    // 在空白处点击时，删除当前存在的 search-node
    graph.on("blank:mouseup", () => {
      removeSearchNode();
    });

    return () => {
      graph.dispose();
    };
  }, []);

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

  useEffect(() => {
    return globalEventBus.on("selectBlueMapSearchPanelItem", () => {});
  }, []);

  return (
    <div className="h-[100%] relative">
      <div className="absolute bottom-5 right-5 z-10 flex space-x-2">
        <Button icon={<ZoomInOutlined />} onClick={handleZoomIn} />
        <Button icon={<ZoomOutOutlined />} onClick={handleZoomOut} />
        <Button icon={<ShrinkOutlined />} onClick={handleZoomTo} />
        <Button icon={<FullscreenOutlined />} onClick={handleZoomToFit} />
        <Button icon={<AimOutlined />} onClick={handleCenterContent} />
      </div>
      <X6Graph onGraphInit={handleGraphInit}></X6Graph>
    </div>
  );
};

export default BlueMap;
