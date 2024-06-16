import { XFlow, XFlowGraph, Grid, Background, Snapline } from "@antv/xflow";
import { InitNode } from "./InitNode";

const BlueMap = () => {
  return (
    <div className="h-[100%]">
      <XFlow>
        <XFlowGraph zoomable minScale={0.5} />
        <Grid type="dot" options={{ color: "#ccc", thickness: 1 }} />
        <Background color="#F2F7FA" />
        <Snapline sharp />
        <InitNode />
      </XFlow>
    </div>
  );
};

export default BlueMap;
