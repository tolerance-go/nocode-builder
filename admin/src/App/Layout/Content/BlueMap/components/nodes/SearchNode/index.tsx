import { globalEventBus } from "@/globals/eventBus";
import { css, cx } from "@emotion/css";
import { Input, Tree } from "antd";
import React, { useMemo, useState } from "react";
import { defaultData } from "../../../treeData";
import { SearchTreeNode, X6ReactComponentProps } from "../../../types";
import { getExpandedKeys } from "../../../utils/getExpandedKeys";
import { highlightMatch } from "../../../utils/highlightMatch";
import { BaseNode } from "../BaseNode";

const { Search } = Input;

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
export const SearchNode: React.FC<X6ReactComponentProps> = (props) => {
  const { graph } = props;

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

  const treeData = useMemo(() => {
    return processTreeData(defaultData, searchValue);
  }, [searchValue]);

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
    <BaseNode title="此蓝图的所有操作" {...props}>
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
          expandAction='doubleClick'
          onClick={(_e, node) => {
            if (node.configId) {
              globalEventBus.emit("selectBlueMapSearchPanelItem", {
                configId: node.configId,
              });
            }
          }}
        />
      </div>
    </BaseNode>
  );
};
