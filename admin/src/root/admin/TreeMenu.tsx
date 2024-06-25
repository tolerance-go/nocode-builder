import { css } from "@emotion/css";
import type { GetProps, TreeDataNode } from "antd";
import { Input, Tree } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

interface TreeMenuProps {
  initialTreeData: TreeDataNode[]; // 初始化数据从上层传入
  ref: React.Ref<TreeMenuRef>;
  onFolderAdd?: (key: React.Key, title: string) => Promise<boolean>; // 增加回调属性，返回 Promise<boolean>
}

export interface TreeMenuRef {
  addFolder: (key?: React.Key) => void;
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
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null); // 维护选中节点的状态

  useImperativeHandle(ref, () => ({
    addFolder,
  }));

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
    setSelectedKey(keys.length > 0 ? keys[0] : null); // 更新选中节点的状态
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
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
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
        titleRender={(nodeData) => (
          <TitleComponent
            title={nodeData.title as string}
            isEditing={(nodeData as CustomTreeDataNode).isEditing}
            onFinish={handleFinish}
            newKey={nodeData.key}
          />
        )}
      />
    </div>
  );
});
