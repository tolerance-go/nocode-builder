import { projectsStore } from "@/store/projects";
import { css } from "@emotion/css";
import type { GetProps, TreeDataNode } from "antd";
import { Input, Tree } from "antd";
import React from "react";
import { useSnapshot } from "valtio";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

interface TreeMenuProps {
  initialTreeData: TreeDataNode[]; // 初始化数据从上层传入
  onFileAdd: (params: {
    parentKey?: React.Key;
    key: React.Key;
    title: string;
  }) => Promise<number>; // 新增文件回调属性，返回 Promise<number>
  onFolderAdd: (params: {
    parentKey?: React.Key;
    key: React.Key;
    title: string;
  }) => Promise<number>; // 增加回调属性，返回 Promise<number>
}

export interface CustomTreeDataNode extends Omit<TreeDataNode, "children"> {
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

const actions = projectsStore.actions;

export const TreeMenu = (props: TreeMenuProps) => {
  const { onFolderAdd, onFileAdd } = props; // 获取初始化数据和回调属性

  const { treeData, expandedKeys } = useSnapshot(projectsStore.states);

  const onSelect: DirectoryTreeProps["onSelect"] = (keys) => {
    actions.setSelectedKey(keys.length > 0 ? keys[0] : null); // 更新选中节点的状态
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys) => {
    actions.setExpandedKeys(keys); // 更新展开状态
  };

  const handleFileFinish = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
    key: React.Key,
  ) => {
    actions.handleFileFinish(e, key, onFileAdd, "New File");
  };

  const handleFolderFinish = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
    key: React.Key,
  ) => {
    actions.handleFolderFinish(e, key, onFolderAdd, "New Folder");
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
        expandedKeys={expandedKeys as React.Key[]} // 受控展开状态
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData as CustomTreeDataNode[]}
        titleRender={(nodeData) => (
          <TitleComponent
            title={nodeData.title as string}
            isEditing={(nodeData as CustomTreeDataNode).isEditing}
            onFinish={nodeData.isLeaf ? handleFileFinish : handleFolderFinish}
            newKey={nodeData.key}
          />
        )}
      />
    </div>
  );
};
