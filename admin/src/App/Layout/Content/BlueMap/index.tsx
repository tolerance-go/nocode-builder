import X6Graph from "@/components/x6/X6Graph";
import { Graph } from "@antv/x6";
import { register } from "@antv/x6-react-shape";
import { SearchNode } from "./SearchNode";
import { useCallback } from "react";

register({
  shape: "search-node",
  width: 300,
  height: 400,
  component: SearchNode,
});

let lastSearchNodeId: string | null = null;

const BlueMap = () => {
  const handleGraphInit = useCallback((graph: Graph) => {
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

    graph.on("blank:contextmenu", ({ e }) => {
      e.preventDefault();
      const rect = graph.container.getBoundingClientRect();

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
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      lastSearchNodeId = newNode.id;
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

    graph.on("edge:mouseup", () => {
      removeSearchNode();
    });

    graph.on("node:mouseup", ({ node }) => {
      if (node.shape !== "search-node") {
        removeSearchNode();
      }
    });

    graph.on("blank:mouseup", () => {
      // 在空白处点击时，删除当前存在的 search-node
      removeSearchNode();
    });
  }, []);

  return (
    <div className="h-[100%]">
      <X6Graph onGraphInit={handleGraphInit}></X6Graph>
    </div>
  );
};

export default BlueMap;
