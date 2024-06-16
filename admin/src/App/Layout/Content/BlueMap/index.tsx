import X6Graph from "@/components/x6/X6Graph";
import { Graph } from "@antv/x6";
import { register } from "@antv/x6-react-shape";
import { SearchNode } from "./SearchNode";

register({
  shape: "search-node",
  width: 300,
  height: 400,
  component: SearchNode,
});

const BlueMap = () => {
  let lastSearchNodeId: string | null = null;

  const handleGraphInit = (graph: Graph) => {
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
  };

  return (
    <div className="h-[100%]">
      <X6Graph onGraphInit={handleGraphInit}></X6Graph>
    </div>
  );
};

export default BlueMap;
