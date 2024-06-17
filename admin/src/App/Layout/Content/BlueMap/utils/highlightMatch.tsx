import React from "react";
import { SearchTreeNode } from "../types";

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
  data: SearchTreeNode[],
  searchValue: string
): SearchTreeNode[] =>
  data.map((item) => {
    const title = highlightMatch(item.title as string, searchValue);
    if (item.children) {
      return {
        title,
        configId: item.configId,
        key: item.key,
        children: processTreeData(item.children, searchValue),
      };
    }
    return {
      title,
      key: item.key,
      configId: item.configId,
    };
  });
