import { css } from "@emotion/css";
import type { GetProps, TreeDataNode } from "antd";
import { Input, Tree } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const initialTreeData: TreeDataNode[] = [
  {
    title: "parent 0",
    key: "0-0",
    children: [
      { title: "leaf 0-0", key: "0-0-0", isLeaf: true },
      { title: "leaf 0-1", key: "0-0-1", isLeaf: true },
    ],
  },
  {
    title: "parent 1",
    key: "0-1",
    children: [
      { title: "leaf 1-0", key: "0-1-0", isLeaf: true },
      { title: "leaf 1-1", key: "0-1-1", isLeaf: true },
    ],
  },
];

interface TreeMenuProps {
  ref: React.Ref<TreeMenuRef>;
  onFolderAdd?: (key: React.Key, title: string) => Promise<boolean>; // 增加回调属性，返回 Promise<boolean>
}

export interface TreeMenuRef {
  addFolder: (key?: React.Key) => void;
}

export const TreeMenu = forwardRef<TreeMenuRef, TreeMenuProps>((props, ref) => {
  const { onFolderAdd } = props; // 获取回调属性
  const [treeData, setTreeData] = useState<TreeDataNode[]>(initialTreeData);

  useImperativeHandle(ref, () => ({
    addFolder,
  }));

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  const addFolder = (key?: React.Key) => {
    const newKey = `${key || "root"}-${Date.now()}`;
    const addNode = (
      data: TreeDataNode[],
      parentKey?: React.Key,
    ): TreeDataNode[] => {
      if (!parentKey) {
        return [
          ...data,
          {
            title: (
              <Input
                autoFocus
                onBlur={(e) => handleFinish(e, newKey)}
                onPressEnter={(e) => handleFinish(e, newKey)}
              />
            ),
            key: newKey,
            children: [],
          },
        ];
      }
      return data.map((item) => {
        if (item.key === parentKey) {
          const newFolder = {
            title: (
              <Input
                autoFocus
                onBlur={(e) => handleFinish(e, newKey)}
                onPressEnter={(e) => handleFinish(e, newKey)}
                style={{
                  width: "100%",
                }}
              />
            ),
            key: newKey,
            children: [],
          };
          return {
            ...item,
            children: [...(item.children || []), newFolder],
          };
        }
        if (item.children) {
          return {
            ...item,
            children: addNode(item.children, parentKey),
          };
        }
        return item;
      });
    };
    setTreeData(addNode(treeData, key));
  };

  const handleFinish = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
    key: React.Key,
  ) => {
    const value = (e.target as HTMLInputElement).value || "New Folder";
    if (onFolderAdd) {
      const result = await onFolderAdd(key, value); // 等待回调结果
      if (result) {
        updateNodeTitle(key, value); // 只有当回调返回 true 时才更新节点标题
      }
    } else {
      updateNodeTitle(key, value);
    }
  };

  const updateNodeTitle = (key: React.Key, title: string) => {
    const updateNode = (data: TreeDataNode[]): TreeDataNode[] => {
      return data.map((item) => {
        if (item.key === key) {
          return { ...item, title };
        }
        if (item.children) {
          return {
            ...item,
            children: updateNode(item.children),
          };
        }
        return item;
      });
    };
    setTreeData(updateNode(treeData));
  };

  return (
    <div>
      <button onClick={() => addFolder("0-0")}>Add Folder to 0-0</button>
      <button onClick={() => addFolder()}>Add Folder to Root</button>
      <DirectoryTree
        className={css`
          .ant-tree-node-content-wrapper {
            display: inline-flex;
            .ant-tree-title {
              flex-grow: 1;
            }
          }
        `}
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    </div>
  );
});
