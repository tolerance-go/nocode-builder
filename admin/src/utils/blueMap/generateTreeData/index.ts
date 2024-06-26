import { menuGroupsByType } from "@/configs/blueMap/menus";
import {
  BlueMapNodeConfig,
  MenuGroups,
  SearchNodeSourceData,
  SearchTreeNode,
} from "@/types/common";
import { ensure } from "@/utils/ensure";
import { Graph } from "@antv/x6";
import { getNodeById } from "../getNodeById";
import { highlightMatch } from "../highlightMatch";
import { validatePortConnectionWithTargetBlueMapPortType } from "../validatePortConnectionWithTargetBlueMapPortType";

const filterMenuGroupsByConfigs = (
  configs: BlueMapNodeConfig[],
  allGroups: MenuGroups
) => {
  const usedGroupTypes = new Set(
    configs.flatMap((config) => config.menu.groupType)
  );
  return allGroups.filter((group) => usedGroupTypes.has(group.type));
};

// 构建组树
const buildGroupTree = (
  groups: MenuGroups
): { [key: string]: SearchTreeNode } => {
  const groupTree: { [key: string]: SearchTreeNode } = {};

  groups.forEach((group) => {
    groupTree[group.type] = {
      title: group.title,
      key: `group_${group.type}`,
      children: [],
    };
  });

  groups.forEach((group) => {
    if (group.parentType) {
      const parentNode = groupTree[group.parentType];
      ensure(parentNode, `Parent group type ${group.parentType} must exist.`);
      parentNode.children?.push(groupTree[group.type]);
    }
  });

  return groupTree;
};

// 将配置挂在组树上
const attachConfigsToTree = (
  groups: { [key: string]: SearchTreeNode },
  configs: BlueMapNodeConfig[]
): void => {
  configs.forEach((config) => {
    config.menu.groupType.forEach((groupType) => {
      const groupNode = groups[groupType];
      ensure(groupNode, `Group type ${groupType} must exist in groups.`);
      groupNode.children?.push({
        title: config.menu.title,
        key: config.menu.key,
        configId: config.id,
        isLeaf: true,
      });
    });
  });
};

export const processTreeData = (
  data: SearchTreeNode[],
  searchValue: string
): SearchTreeNode[] => {
  return data.map((item) => {
    const title = highlightMatch(item.title as string, searchValue);
    if (item.children) {
      return {
        title,
        key: item.key,
        configId: item.configId,
        selectable: false, // 父节点不可选择
        children: processTreeData(item.children, searchValue),
      } as SearchTreeNode;
    }
    return {
      title,
      key: item.key,
      configId: item.configId,
      selectable: true, // 叶子节点可选择
      isLeaf: true,
    } as SearchTreeNode;
  });
};

export const filterConfigsBySource = (
  configs: BlueMapNodeConfig[],
  source: SearchNodeSourceData,
  graph: Graph
) => {
  const sourceNode = getNodeById(source.nodeId, graph);
  return configs.filter((targetBlueMapConfig) => {
    return (
      (targetBlueMapConfig.connections.input?.ports.some(
        (targetBlueMapPortConfig) => {
          const targetBlueMapPortIoType = "input";
          const targetBlueMapPortType = targetBlueMapPortConfig.type;

          return validatePortConnectionWithTargetBlueMapPortType({
            sourceNode,
            sourcePortId: source.portId,
            targetBlueMapPortIoType,
            targetBlueMapPortType,
          });
        }
      ) ??
        true) ||
      (targetBlueMapConfig.connections.output?.ports.some(
        (targetBlueMapPortConfig) => {
          const targetBlueMapPortIoType = "output";
          const targetBlueMapPortType = targetBlueMapPortConfig.type;

          return validatePortConnectionWithTargetBlueMapPortType({
            sourceNode,
            sourcePortId: source.portId,
            targetBlueMapPortIoType,
            targetBlueMapPortType,
          });
        }
      ) ??
        true)
    );
  });
};

// 生成最终的树结构
export const generateTreeData = (
  configs: BlueMapNodeConfig[],
  menuGroups: MenuGroups
): SearchTreeNode[] => {
  const filteredGroups = filterMenuGroupsByConfigs(configs, menuGroups);
  const groups = buildGroupTree(filteredGroups);
  attachConfigsToTree(groups, configs);

  // 过滤出根节点
  return Object.values(groups).filter(
    (node) => !menuGroupsByType.get(node.key)?.parentType
  );
};
