import React, { useMemo, useState } from "react";
import { Input, Tree, Typography } from "antd";
import { defaultData, getParentKey } from "./treeData";
import type { TreeDataNode } from "antd";

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
    const newExpandedKeys = defaultData
      .map((item) => {
        if (typeof item.title === "string" && item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter(
        (item, i, self): item is React.Key =>
          !!(item && self.indexOf(item) === i)
      );
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const treeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data.map((item) => {
        const strTitle = item.title as string;
        const index =
          typeof strTitle === "string" ? strTitle.indexOf(searchValue) : -1;
        const beforeStr =
          typeof strTitle === "string" ? strTitle.substring(0, index) : "";
        const afterStr =
          typeof strTitle === "string"
            ? strTitle.slice(index + searchValue.length)
            : "";
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      });

    return loop(defaultData);
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
      />
    </div>
  );
};
