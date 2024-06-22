import { ensure } from "@/utils/ensure";
import { Graph } from "@antv/x6";
import { css, cx } from "@emotion/css";
import { Input, Tree } from "antd";
import React, { useMemo, useState } from "react";
import { blueMapNodeConfigs } from "../../../configs/blueMapNodeConfigs";
import { menuGroups, menuGroupsByType } from "../../../configs/menus";
import { blueMapEventBus } from "../../../globals/eventBus";
import {
  BlueMapNodeConfig,
  MenuGroups,
  SearchNodeSourceData,
  SearchTreeNode,
  X6ReactComponentProps,
} from "../../../types";
import { getExpandedKeys } from "../../../utils/getExpandedKeys";
import { getNodeById } from "../../../utils/getNodeById";
import { highlightMatch } from "../../../utils/highlightMatch";
import { validatePortConnectionWithTargetBlueMapPortType } from "../../../utils/validatePortConnectionWithTargetBlueMapPortType";
import { BaseNode } from "../BaseNode";

const { Search } = Input;

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
      key: group.type,
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

// 生成最终的树结构
const generateTreeData = (
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

const processTreeData = (
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

const filterConfigsBySource = (
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

export const SearchNode: React.FC<X6ReactComponentProps> = (props) => {
  const { graph, node } = props;

  const source = node.getPropByPath("source") as
    | SearchNodeSourceData
    | undefined;

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = getExpandedKeys(value, defaultData);
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const defaultData: SearchTreeNode[] = useMemo(() => {
    if (!source) return generateTreeData(blueMapNodeConfigs, menuGroups);

    const filteredConfigs = filterConfigsBySource(
      blueMapNodeConfigs,
      source,
      graph
    );
    return generateTreeData(filteredConfigs, menuGroups);
  }, [source, graph]);

  const treeData = useMemo(() => {
    return processTreeData(defaultData, searchValue);
  }, [searchValue, defaultData]);

  /**
   * input 聚焦的时候，全局的 Keyboard 插件监听不到，要手动处理
   *
   * @param e
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      e.key.toLowerCase() /** shift 按下的时候，z 是大写 */ === "z"
    ) {
      e.preventDefault();
      if (e.shiftKey) {
        graph.redo();
      } else {
        graph.undo();
      }
    }
  };

  return (
    <BaseNode title="此蓝图的所有操作" {...props} backgroundColor="white">
      <div className="p-2">
        <Search
          placeholder="输入搜索内容"
          onChange={onChange}
          autoFocus
          onKeyDown={handleKeyDown}
          size="small"
          className={cx(
            "mb-2",
            css`
              .ant-input {
                height: 24px;
              }
            `
          )}
        />
        <Tree.DirectoryTree<SearchTreeNode>
          blockNode
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={treeData}
          showIcon={false}
          expandAction="doubleClick"
          onClick={(_e, node) => {
            if (node.configId) {
              blueMapEventBus.emit("selectBlueMapSearchPanelItem", {
                configId: node.configId,
              });
            }
          }}
        />
      </div>
    </BaseNode>
  );
};
