import { blueMapNodeConfigs } from "@/configs/blueMap/blueMapNodeConfigs";
import { menuGroups } from "@/configs/blueMap/menus";
import { blueMapEventBus } from "@/globals/blueMapEventBus";
import {
  SearchNodeSourceData,
  SearchTreeNode,
  X6ReactComponentProps,
} from "@/types";
import {
  filterConfigsBySource,
  generateTreeData,
  processTreeData,
} from "@/utils/blueMap/generateTreeData";
import { getExpandedKeys } from "@/utils/blueMap/getExpandedKeys";
import { css, cx } from "@emotion/css";
import { Input, Tree } from "antd";
import React, { useMemo, useState } from "react";
import { BaseNode } from "../BaseNode";

const { Search } = Input;

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
