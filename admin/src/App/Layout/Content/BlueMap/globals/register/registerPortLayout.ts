import { Graph } from "@antv/x6";

// 注册 fromTopToBottom 布局算法
Graph.registerPortLayout(
  "fromTopToBottom",
  (portsPositionArgs, elemBBox, args) => {
    const position = args.position || "left"; // 默认位置为左边
    const offsetTop = args.offsetTop || 0;
    const gap = args.gap || 0;

    return portsPositionArgs.map((portArgs, index) => {
      const portHeight = portArgs.height ? portArgs.height : 0; // 假设 port 中包含 size 信息
      const distance = offsetTop + index * (portHeight + gap);
      return {
        position: {
          x: position === "left" ? 0 : elemBBox.width,
          y: distance,
        },
        angle: 0,
      };
    });
  },
  true
);
