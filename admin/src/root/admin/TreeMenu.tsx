import { css } from "@emotion/css";
import type { GetProps, TreeDataNode } from "antd";
import { Input, Tree } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

interface TreeMenuProps {
  initialTreeData: TreeDataNode[]; // 初始化数据从上层传入
  ref: React.Ref<TreeMenuRef>;
  onFileAdd?: (key: React.Key, title: string) => Promise<boolean>; // 新增文件回调属性，返回 Promise<boolean>
  onFolderAdd?: (key: React.Key, title: string) => Promise<boolean>; // 增加回调属性，返回 Promise<boolean>
}

export interface TreeMenuRef {
  addFolder: (key?: React.Key) => void;
  addFile: (key?: React.Key) => void; // 新增 addFile 方法
}

interface CustomTreeDataNode extends Omit<TreeDataNode, "children"> {
  isEditing?: boolean;
  children?: CustomTreeDataNode[];
}

const TitleComponent = ({
  title,
  isEditing,
  onFinish,
  newKey,
}: {
  title: string;
  isEditing?: boolean;
  onFinish: (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
    key: React.Key,
  ) => void;
  newKey: React.Key;
}) => {
  return isEditing ? (
    <Input
      autoFocus
      defaultValue={title}
      onBlur={(e) => onFinish(e, newKey)}
      onPressEnter={(e) => onFinish(e, newKey)}
      style={{ width: "100%" }}
    />
  ) : (
    <span>{title}</span>
  );
};

export const TreeMenu = forwardRef<TreeMenuRef, TreeMenuProps>((props, ref) => {
  const { initialTreeData, onFolderAdd } = props; // 获取初始化数据和回调属性
  const [treeData, setTreeData] =
    useState<CustomTreeDataNode[]>(initialTreeData);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]); // 维护展开状态
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null); // 维护选中节点的状态

  useImperativeHandle(ref, () => ({
    addFolder,
    addFile, // 暴露 addFile 方法
  }));

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
    setSelectedKey(keys.length > 0 ? keys[0] : null); // 更新选中节点的状态
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
    setExpandedKeys(keys); // 更新展开状态
  };

  const addFile = (key?: React.Key) => {
    const newKey = `${key || "root"}-file-${Date.now()}`;
    const addNode = (
      data: CustomTreeDataNode[],
      parentKey?: React.Key,
    ): CustomTreeDataNode[] => {
      if (!parentKey) {
        // 如果没有指定位置，就在所有文件夹后面插入文件，并设置为编辑状态
        const folderIndex = data.findLastIndex((item) => item.children);
        const insertIndex = folderIndex === -1 ? 0 : folderIndex + 1;
        return [
          ...data.slice(0, insertIndex),
          {
            title: "",
            key: newKey,
            isEditing: true,
            isLeaf: true, // 标记为文件
          },
          ...data.slice(insertIndex),
        ];
      }

      let isInserted = false;
      const insertNode = (
        items: CustomTreeDataNode[],
      ): CustomTreeDataNode[] => {
        return items.map((item) => {
          if (item.key === parentKey) {
            const parentFolder = item;
            if (parentFolder.children) {
              // 判断文件夹是否已经展开，如果未展开，则展开它
              if (!expandedKeys.includes(parentFolder.key)) {
                setExpandedKeys((prevKeys) => [...prevKeys, parentFolder.key]);
              }
              isInserted = true;
              // 找到所有文件夹后的第一个文件位置插入文件
              const indexToInsert = parentFolder.children.findIndex(
                (child) => !child.children,
              );
              const insertIndex =
                indexToInsert === -1
                  ? parentFolder.children.length
                  : indexToInsert;
              const newChildren = [
                ...parentFolder.children.slice(0, insertIndex),
                {
                  title: "",
                  key: newKey,
                  isEditing: true,
                  isLeaf: true, // 标记为文件
                },
                ...parentFolder.children.slice(insertIndex),
              ];
              return {
                ...item,
                children: newChildren,
              };
            }
          }
          if (item.children && !isInserted) {
            return {
              ...item,
              children: insertNode(item.children),
            };
          }
          return item;
        });
      };

      return insertNode(data);
    };

    setTreeData((prevData) =>
      addNode(prevData, selectedKey ?? key ?? undefined),
    ); // 使用选中节点作为默认位置
  };

  const handleFileFinish = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
    key: React.Key,
  ) => {
    const value = (e.target as HTMLInputElement).value || "New File";
    if (props.onFileAdd) {
      const result = await props.onFileAdd(key, value); // 等待回调结果
      if (result) {
        updateNodeTitle(key, value); // 只有当回调返回 true 时才更新节点标题
      } else {
        // 如果回调返回 false，则删除临时添加的节点
        setTreeData((prevData) => deleteNode(prevData, key));
      }
    } else {
      updateNodeTitle(key, value);
    }
  };

  const addFolder = (key?: React.Key) => {
    const newKey = `${key || "root"}-${Date.now()}`;
    const addNode = (
      data: CustomTreeDataNode[],
      parentKey?: React.Key,
    ): CustomTreeDataNode[] => {
      if (!parentKey) {
        // 如果没有指定位置，就插入到最外层的最前面，并设置为编辑状态
        return [
          {
            title: "",
            key: newKey,
            isEditing: true,
            children: [],
          },
          ...data,
        ];
      }

      let isInserted = false;
      const insertNode = (
        items: CustomTreeDataNode[],
      ): CustomTreeDataNode[] => {
        return items.map((item) => {
          if (item.key === parentKey) {
            if (item.children) {
              // 判断文件夹是否已经展开，如果未展开，则展开它
              if (!expandedKeys.includes(item.key)) {
                setExpandedKeys((prevKeys) => [...prevKeys, item.key]);
              }
              // 如果是文件夹，在文件夹下面的最前面插入，并设置为编辑状态
              isInserted = true;
              return {
                ...item,
                children: [
                  {
                    title: "",
                    key: newKey,
                    isEditing: true,
                    children: [],
                  },
                  ...item.children,
                ],
              };
            } else {
              // 如果是文件，从文件的所在文件夹的最前面插入，并设置为编辑状态
              const parentFolder = findParentFolder(data, parentKey);
              if (parentFolder) {
                isInserted = true;
                // 判断文件夹是否已经展开，如果未展开，则展开它
                if (!expandedKeys.includes(parentFolder.key)) {
                  setExpandedKeys((prevKeys) => [
                    ...prevKeys,
                    parentFolder.key,
                  ]);
                }
                parentFolder.children = [
                  {
                    title: "",
                    key: newKey,
                    isEditing: true,
                    children: [],
                  },
                  ...(parentFolder.children || []),
                ];
              }
            }
          }
          if (item.children && !isInserted) {
            return {
              ...item,
              children: insertNode(item.children),
            };
          }
          return item;
        });
      };

      return insertNode(data);
    };

    setTreeData((prevData) =>
      addNode(prevData, selectedKey ?? key ?? undefined),
    ); // 使用选中节点作为默认位置
  };

  const findParentFolder = (
    data: CustomTreeDataNode[],
    childKey: React.Key,
  ): CustomTreeDataNode | null => {
    for (const item of data) {
      if (
        item.children &&
        item.children.some((child) => child.key === childKey)
      ) {
        return item;
      }
      if (item.children) {
        const parent = findParentFolder(item.children, childKey);
        if (parent) {
          return parent;
        }
      }
    }
    return null;
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
      } else {
        // 如果回调返回 false，则删除临时添加的节点
        setTreeData((prevData) => deleteNode(prevData, key));
      }
    } else {
      updateNodeTitle(key, value);
    }
  };

  const updateNodeTitle = (key: React.Key, title: string) => {
    const updateNode = (data: CustomTreeDataNode[]): CustomTreeDataNode[] => {
      return data.map((item) => {
        if (item.key === key) {
          return { ...item, title, isEditing: false };
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

  const deleteNode = (
    data: CustomTreeDataNode[],
    key: React.Key,
  ): CustomTreeDataNode[] => {
    return data
      .filter((item) => item.key !== key)
      .map((item) => {
        if (item.children) {
          return {
            ...item,
            children: deleteNode(item.children, key),
          };
        }
        return item;
      });
  };

  return (
    <div>
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
        expandedKeys={expandedKeys} // 受控展开状态
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
        titleRender={(nodeData) => (
          <TitleComponent
            title={nodeData.title as string}
            isEditing={(nodeData as CustomTreeDataNode).isEditing}
            onFinish={nodeData.isLeaf ? handleFileFinish : handleFinish}
            newKey={nodeData.key}
          />
        )}
      />
    </div>
  );
});
