import { register } from "@antv/x6-react-shape";
import { nodeConfigs, portConfigs } from "../configs/configs";
import { checkDuplicateIds } from "../utils/checkDuplicateIds";
import { Graph } from "@antv/x6";

/**
 * 不希望在本地存储树数据中存储样式信息
 */

// 注册 leftTop 布局算法
Graph.registerPortLayout(
  "leftTop",
  (portsPositionArgs, elemBBox) => {
    const paddingTop = 70;
    const paddingBottom = 40;
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
  (portsPositionArgs, elemBBox) => {
    const paddingTop = 70;
    const paddingBottom = 40;
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
