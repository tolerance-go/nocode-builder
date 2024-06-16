import X6Graph from "@/components/x6/X6Graph";
import { Graph } from "@antv/x6";

const BlueMap = () => {
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
  };

  return (
    <div className="h-[100%]">
      <X6Graph onGraphInit={handleGraphInit}></X6Graph>
    </div>
  );
};

export default BlueMap;
