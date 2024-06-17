import React from "react";
import type { TreeDataNode } from "antd";

// 高亮匹配文本的函数
export const highlightMatch = (
  title: string,
  searchValue: string
): React.ReactNode => {
  const index = title.indexOf(searchValue);
  if (index === -1) {
    return <span>{title}</span>;
  }
  const beforeStr = title.substring(0, index);
  const afterStr = title.slice(index + searchValue.length);
  return (
    <span>
      {beforeStr}
      <span className="bg-yellow-200">{searchValue}</span>
      {afterStr}
    </span>
  );
};

// 递归处理树节点
export const processTreeData = (
  data: TreeDataNode[],
  searchValue: string
): TreeDataNode[] =>
  data.map((item) => {
    const title = highlightMatch(item.title as string, searchValue);
    if (item.children) {
      return {
        title,
        key: item.key,
        children: processTreeData(item.children, searchValue),
      };
    }
    return { title, key: item.key };
  });
