import React, { useEffect, useState } from "react";
import { Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { css } from "@emotion/css";
import { NodeData } from "@/types";
import { useSnapshot } from "valtio";
import store from "@/store";
import { DeepReadonly } from "@/utils/types";

const convertNodeDataToTreeData = (
  node: DeepReadonly<NodeData>
): TreeDataNode => {
  const children = Array.isArray(node.children)
    ? node.children.map((child) => convertNodeDataToTreeData(child as NodeData))
    : [];

  return {
    title: node.elementType,
    key: node.id,
    children,
  };
};

const TreeList: React.FC = () => {
  const designTreeData = useSnapshot(store.designs.states.designTreeData);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const onSelect: TreeProps["onSelect"] = (selectedKeys) => {
    store.designs.actions.selectNode(selectedKeys as string[]);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  useEffect(() => {
    const treeDataConverted = designTreeData.value.nodeData.map((item) =>
      convertNodeDataToTreeData(item)
    );
    setTreeData(treeDataConverted);

    // Generate keys to expand all nodes
    const generateKeys = (
      nodes: TreeDataNode[],
      keys: React.Key[] = []
    ): React.Key[] => {
      nodes.forEach((node) => {
        keys.push(node.key);
        if (node.children) {
          generateKeys(node.children, keys);
        }
      });
      return keys;
    };

    setExpandedKeys(generateKeys(treeDataConverted));
  }, [designTreeData]);

  return (
    <div className="p-2">
      <Tree
        className={css`
          & {
            border-radius: 0;
          }
        `}
        blockNode
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
      />
    </div>
  );
};

export default TreeList;
