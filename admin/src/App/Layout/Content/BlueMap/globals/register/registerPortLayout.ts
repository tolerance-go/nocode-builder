import { Graph } from "@antv/x6";

// 注册 leftTop 布局算法
Graph.registerPortLayout(
  "leftTop",
  (portsPositionArgs, elemBBox, args) => {
    const offsetTop = args.offsetTop || 0;
    const step =
      portsPositionArgs.length > 1
        ? (elemBBox.height - offsetTop) / (portsPositionArgs.length - 1)
        : 0;
    return portsPositionArgs.map((_, index) => {
      const portHeight = _.size ? _.size.height : 0; // 假设 _ 中包含 size 信息
      const distance = offsetTop + index * (portHeight + step);
      return {
        position: {
          x: 0,
          y: distance,
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
    const offsetTop = args.offsetTop || 0;
    const step =
      portsPositionArgs.length > 1
        ? (elemBBox.height - offsetTop) / (portsPositionArgs.length - 1)
        : 0;
    return portsPositionArgs.map((_, index) => {
      const portHeight = _.size ? _.size.height : 0; // 假设 _ 中包含 size 信息
      const distance = offsetTop + index * (portHeight + step);
      return {
        position: {
          x: elemBBox.width,
          y: distance,
        },
        angle: 0,
      };
    });
  },
  true
);
