import { globalEventBus } from "@/globals/eventBus";
import useLatest from "@/hooks/useLatest";
import stores from "@/stores";
import { RouteNode } from "@/types";
import { DeepReadonly } from "@/utils/types";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { css } from "@emotion/css";
import type { InputRef, TreeDataNode, TreeProps } from "antd";
import { Button, Input, Space, Tree } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";

const TreeList: React.FC = () => {
  const snapshot = useSnapshot(stores.routes.states.routeNodes);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [inputStatus, setInputStatus] = useState<"error" | undefined>(
    undefined
  );
  const inputRef = useRef<InputRef>(null);

  const handleInputChange = (value: string, nodeId: string) => {
    if (isValidPath(value, nodeId)) {
      setInputStatus(undefined);
    } else {
      setInputStatus("error");
    }
  };

  const handleInputBlur = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
    nodeId: string
  ) => {
    const newPath = inputRef.current?.input?.value.trim();
    if (newPath && isValidPath(newPath, nodeId)) {
      // 更新节点路径
      stores.routes.actions.updateNode(nodeId, { path: newPath });
    } else {
      // 如果输入无效，删除节点
      stores.routes.actions.deleteNode(nodeId);
    }
    setEditingKey(null);
    setInputStatus(undefined);
  };

  const isValidPath = (path: string, nodeId: string): boolean => {
    // 查找节点及其父节点
    const findNodeAndParent = (
      nodes: DeepReadonly<RouteNode[]>,
      id: string
    ): {
      node: DeepReadonly<RouteNode> | null;
      parent: DeepReadonly<RouteNode> | null;
    } => {
      let foundNode: DeepReadonly<RouteNode> | null = null;
      let foundParent: DeepReadonly<RouteNode> | null = null;

      const traverse = (
        currentNodes: DeepReadonly<RouteNode[]>,
        parentNode: DeepReadonly<RouteNode> | null
      ) => {
        for (const node of currentNodes) {
          if (node.id === id) {
            foundNode = node;
            foundParent = parentNode;
            return;
          }
          if (node.children) {
            traverse(node.children, node);
            if (foundNode) return;
          }
        }
      };

      traverse(nodes, null);

      return { node: foundNode, parent: foundParent };
    };

    const { node, parent } = findNodeAndParent(snapshot.nodes, nodeId);

    if (!node) return false;

    // 确保顶层路径以 '/' 开头
    if (!parent && !path.startsWith("/")) {
      return false;
    }

    // 确保非顶层路径不以 '/' 开头
    if (parent && path.startsWith("/")) {
      return false;
    }

    // 确保路径只包含有效的 URL 字符
    const urlPattern = /^[a-zA-Z0-9\-._~!$&'()*+,;=:@/]*$/;
    return urlPattern.test(path);
  };

  const addNode = (parentId: string | null = null) => {
    const newNode: RouteNode = {
      id: `${Date.now()}`,
      path: parentId ? "" : "/",
      children: [],
    };
    stores.routes.actions.addNode(parentId, newNode);
    setEditingKey(newNode.id);
    setInputStatus(undefined);
    if (parentId) {
      setExpandedKeys((prevKeys) => [...prevKeys, parentId]);
    }
  };

  const deleteNode = (nodeId: string) => {
    stores.routes.actions.deleteNode(nodeId);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeys) => {
    if (selectedKeys.length > 0) {
      const nodeId = selectedKeys[0] as string;
      const fullPath = stores.routes.actions.getNodeFullPath(nodeId);
      if (fullPath) {
        globalEventBus.emit("stageNavigate", { to: fullPath });
      }
    }
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  const onExpand: TreeProps["onExpand"] = (expandedKeys) => {
    setExpandedKeys(expandedKeys as string[]);
  };

  const latestHandleInputChange = useLatest(handleInputChange);
  const latestHandleInputBlur = useLatest(handleInputBlur);
  const latestAddNode = useLatest(addNode);
  const latestDeleteNode = useLatest(deleteNode);

  useEffect(() => {
    // 将 routeNodes 转换为 treeData 格式
    const convertToTreeData = (
      nodes: DeepReadonly<RouteNode[]>
    ): TreeDataNode[] => {
      return nodes.map((node) => ({
        title: (
          <div
            className="flex justify-between items-center"
            onDoubleClick={() => setEditingKey(node.id)}
          >
            {node.id === editingKey ? (
              <Input
                variant="borderless"
                ref={inputRef}
                defaultValue={node.path}
                status={inputStatus}
                onChange={(e) =>
                  latestHandleInputChange.current(e.target.value, node.id)
                }
                onBlur={(e) => latestHandleInputBlur.current(e, node.id)}
                onPressEnter={(e) => latestHandleInputBlur.current(e, node.id)}
                autoFocus
              />
            ) : (
              node.name || node.path
            )}
            {node.id !== editingKey && (
              <Space>
                <Button
                  type="text"
                  size="small"
                  onClick={() => latestAddNode.current(node.id)}
                  icon={<PlusOutlined />}
                />
                <Button
                  type="text"
                  size="small"
                  onClick={() => latestDeleteNode.current(node.id)}
                  icon={<DeleteOutlined />}
                />
              </Space>
            )}
          </div>
        ),
        key: node.id,
        children: node.children ? convertToTreeData(node.children) : undefined,
      }));
    };
    setTreeData(convertToTreeData(snapshot.nodes));
  }, [
    snapshot.nodes,
    editingKey,
    inputStatus,
    latestHandleInputChange,
    latestHandleInputBlur,
    latestAddNode,
    latestDeleteNode,
  ]);

  return (
    <div className="bg-white">
      <div className="flex justify-end px-2 py-1 border-b">
        <Button
          type="text"
          size="small"
          onClick={() => latestAddNode.current(null)}
        >
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
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        treeData={treeData}
      />
    </div>
  );
};

export default TreeList;
