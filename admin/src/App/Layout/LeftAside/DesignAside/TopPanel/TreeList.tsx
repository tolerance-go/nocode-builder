import React, { useEffect, useState } from "react";
import { Tree, Button, Input, Modal, Flex } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import stores from "@/stores";
import { RouteNode } from "@/types";
import { DeepReadonly } from "@/utils/types";

const TreeList: React.FC = () => {
  const snapshot = useSnapshot(stores.routes.states.routeNodes);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [newNodeTitle, setNewNodeTitle] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);

  useEffect(() => {
    // Convert routeNodes to treeData format
    const convertToTreeData = (
      nodes: DeepReadonly<RouteNode[]>
    ): TreeDataNode[] => {
      return nodes.map((node) => ({
        title: node.name || node.path,
        key: node.path,
        children: node.children ? convertToTreeData(node.children) : undefined,
      }));
    };
    setTreeData(convertToTreeData(snapshot.nodes));
  }, [snapshot.nodes]);

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
    setSelectedNodeKey(selectedKeys[0] as string);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  const showAddNodeModal = () => {
    setIsModalVisible(true);
  };

  const handleAddNode = () => {
    if (newNodeTitle) {
      stores.routes.actions.addNode(null, {
        path: `${selectedNodeKey}-${newNodeTitle}`,
        name: newNodeTitle,
      });
    }
    setIsModalVisible(false);
    setNewNodeTitle("");
  };

  const handleDeleteNode = () => {
    if (selectedNodeKey !== null) {
      stores.routes.actions.deleteNode(selectedNodeKey);
    }
  };

  return (
    <div className="bg-white">
      <Flex justify="end" className="px-2 py-1 border-b">
        <Button type="text" size="small">
          新增
        </Button>
      </Flex>
      <Tree
        className={css`
          & {
            border-radius: 0;
          }
        `}
        blockNode
        defaultExpandedKeys={["0-0-0", "0-0-1"]}
        defaultSelectedKeys={["0-0-0", "0-0-1"]}
        defaultCheckedKeys={["0-0-0", "0-0-1"]}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
      />
      <Button onClick={showAddNodeModal}>Add Node</Button>
      <Button onClick={handleDeleteNode}>Delete Node</Button>
      <Modal
        title="Add Node"
        visible={isModalVisible}
        onOk={handleAddNode}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          value={newNodeTitle}
          onChange={(e) => setNewNodeTitle(e.target.value)}
          placeholder="Enter node title"
        />
      </Modal>
    </div>
  );
};

export default TreeList;
