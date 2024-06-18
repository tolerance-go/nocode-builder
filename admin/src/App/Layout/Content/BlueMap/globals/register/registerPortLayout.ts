import { Graph } from "@antv/x6";

// 注册 leftTop 布局算法
Graph.registerPortLayout(
  "leftTop",
  (portsPositionArgs, elemBBox, args) => {
    const offsetTop = args.offsetTop || 70;
    const offsetBottom = args.offsetBottom || 40;
    const step =
      portsPositionArgs.length > 1
        ? (elemBBox.height - offsetTop - offsetBottom) /
          (portsPositionArgs.length - 1)
        : 0;
    return portsPositionArgs.map((_, index) => {
      console.log(_);
      return {
        position: {
          x: 0,
          y: offsetTop + index * step,
        },
        angle: 0,
      };
    });
  },
  true
);

// 注册 rightTop 布局算法
Graph.registerPortLayout(
  "rightTop",
  (portsPositionArgs, elemBBox, args) => {
    const offsetTop = args.offsetTop || 70;
    const offsetBottom = args.offsetBottom || 40;
    const step =
      portsPositionArgs.length > 1
        ? (elemBBox.height - offsetTop - offsetBottom) /
          (portsPositionArgs.length - 1)
        : 0;
    return portsPositionArgs.map((_, index) => {
      return {
        position: {
          x: elemBBox.width,
          y: offsetTop + index * step,
        },
        angle: 0,
      };
    });
  },
  true
);
