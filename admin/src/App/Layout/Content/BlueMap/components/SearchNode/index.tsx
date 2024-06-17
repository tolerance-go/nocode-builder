import { globalEventBus } from "@/globals/eventBus";
import { ensure } from "@/utils/ensure";
import { Input, Tree, Typography } from "antd";
import React, { useMemo, useState } from "react";
import { defaultData } from "../../treeData";
import { SearchTreeNode } from "../../types";
import { getExpandedKeys } from "../../utils/getExpandedKeys";
import { highlightMatch } from "../../utils/highlightMatch";

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
      };
    }
    return {
      title,
      key: item.key,
      configId: item.configId,
      selectable: true, // 叶子节点可选择
    };
  });
};
export const SearchNode: React.FC = () => {
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

  return (
    <div className="bg-white border px-1.5 py-1 rounded-md h-[100%]">
      <div className="mb-1.5">
        <Typography.Text>此蓝图的所有操作</Typography.Text>
      </div>
      <Search
        placeholder="输入搜索内容"
        onChange={onChange}
        autoFocus
        size="small"
        className="mb-1.5"
      />
      <Tree<SearchTreeNode>
        blockNode
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        onClick={(_e, node) => {
          ensure(!!node.configId, "node.configId 必须存在。");
          globalEventBus.emit("selectBlueMapSearchPanelItem", {
            configId: node.configId,
          });
        }}
      />
    </div>
  );
};
