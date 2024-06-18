import { register } from "@antv/x6-react-shape";
import { nodeConfigs, portConfigs } from "../configs/configs";
import { checkDuplicateIds } from "../utils/checkDuplicateIds";
import { Graph } from "@antv/x6";

// 注册 leftTop 布局算法
Graph.registerPortLayout(
  "leftTop",
  (portsPositionArgs, elemBBox, args) => {
    const paddingTop = args.y || 0; // 默认上间距为10
    const paddingBottom = args.dy || 0; // 默认下间距为10
    const step =
      portsPositionArgs.length > 1
        ? (elemBBox.height - paddingTop - paddingBottom) /
          (portsPositionArgs.length - 1)
        : 0;
    return portsPositionArgs.map((_, index) => {
      console.log(_);
      return {
        position: {
          x: 0,
          y: paddingTop + index * step,
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
    const paddingTop = args.y || 0; // 默认上间距为10
    const paddingBottom = args.dy || 0; // 默认下间距为10
    const step =
      portsPositionArgs.length > 1
        ? (elemBBox.height - paddingTop - paddingBottom) /
          (portsPositionArgs.length - 1)
        : 0;
    return portsPositionArgs.map((_, index) => {
      return {
        position: {
          x: elemBBox.width,
          y: paddingTop + index * step,
        },
        angle: 0,
      };
    });
  },
  true
);

// 检查节点配置的 id 是否重复
checkDuplicateIds(nodeConfigs);

// 检查端口配置的 id 是否重复
checkDuplicateIds(portConfigs);

nodeConfigs.forEach((config) => {
  register(config.shape);
});
