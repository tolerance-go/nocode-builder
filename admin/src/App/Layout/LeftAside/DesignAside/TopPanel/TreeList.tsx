import stores from "@/stores";
import { RouteNode } from "@/types";
import { DeepReadonly } from "@/utils/types";
import { css } from "@emotion/css";
import type { InputRef, TreeDataNode, TreeProps } from "antd";
import { Button, Input, Tree } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";

const TreeList: React.FC = () => {
  const snapshot = useSnapshot(stores.routes.states.routeNodes);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    // Convert routeNodes to treeData format
    const convertToTreeData = (
      nodes: DeepReadonly<RouteNode[]>
    ): TreeDataNode[] => {
      return nodes.map((node) => ({
        title: (
          <div>
            {node.id === editingKey ? (
              <Input
                ref={inputRef}
                defaultValue={node.path}
                onBlur={(e) => handleInputBlur(e, node.id)}
                onPressEnter={(e) => handleInputBlur(e, node.id)}
                autoFocus
              />
            ) : (
              node.name || node.path
            )}
            <Button
              type="text"
              size="small"
              onClick={() => addNode(node.id)}
              style={{ marginLeft: 8 }}
            >
              新增
            </Button>
          </div>
        ),
        key: node.id,
        children: node.children ? convertToTreeData(node.children) : undefined,
      }));
    };
    setTreeData(convertToTreeData(snapshot.nodes));
  }, [snapshot.nodes, editingKey]);

  const handleInputBlur = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
    nodeId: string
  ) => {
    const newPath = (e.target as HTMLInputElement).value.trim();
    if (newPath && isValidPath(newPath)) {
      // Update the node path
      stores.routes.actions.updateNode(nodeId, { path: newPath });
    } else {
      // Remove the node if the input is not valid
      stores.routes.actions.deleteNode(nodeId);
    }
    setEditingKey(null);
  };

  const isValidPath = (path: string): boolean => {
    // Add your validation logic here
    return !!path;
  };

  const addNode = (parentId: string | null = null) => {
    const newNode: RouteNode = {
      id: `${Date.now()}`,
      path: "",
      children: [],
    };
    stores.routes.actions.addNode(parentId, newNode);
    setEditingKey(newNode.id);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <div className="bg-white">
      <div className="flex justify-end px-2 py-1 border-b">
        <Button type="text" size="small" onClick={() => addNode(null)}>
          新增
        </Button>
      </div>
      <Tree
        className={css`
          & {
            border-radius: 0;
          }
        `}
        blockNode
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
      />
    </div>
  );
};

export default TreeList;
