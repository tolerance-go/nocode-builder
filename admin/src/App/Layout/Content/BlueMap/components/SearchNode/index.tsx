import React, { useMemo, useState } from "react";
import { Input, Tree, Typography } from "antd";
import { defaultData } from "../../treeData";
import { processTreeData } from "../../utils/highlightMatch";
import { getExpandedKeys } from "../../utils/getExpandedKeys";
import { globalEventBus } from "@/globals/eventBus";

const { Search } = Input;

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
      <Tree
        blockNode
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        onClick={(_e, node) => {
          globalEventBus.emit("selectBlueMapSearchPanelItem", {
            id: node.key,
          });
        }}
      />
    </div>
  );
};
