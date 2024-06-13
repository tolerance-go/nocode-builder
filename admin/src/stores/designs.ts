import { globalEventBus } from "@/globals/eventBus";
import {
  DocumentInsertionPosition,
  NodeData,
  SlotsChildren,
  StaticProps,
} from "@/types";
import { ensure } from "@/utils/ensure";
import { DeepReadonly } from "@/utils/types";
import { proxy, subscribe } from "valtio";

const designTreeData = proxy<{
  nodeData: NodeData[];
}>({
  nodeData: [],
});

subscribe(designTreeData, () => {
  globalEventBus.emit("nodeTreeChange", designTreeData.nodeData);
});

/** 当前悬停的组件 id 集合 */
const hoveredComponents = proxy<{
  ids: string[];
}>({
  ids: [],
});

/**
 * 当前是否在拖拽组件中
 */
const dragging = proxy<{
  /**
   * 当前被拖拽的 node id
   */
  draggingId: string | null;
}>({
  draggingId: null,
});

/** 选中的组件 */
const selectedNodes = proxy<{
  selectedIds: string[];
  uniqueSelectedId: undefined | string;
}>({
  selectedIds: [],
  get uniqueSelectedId() {
    return this.selectedIds[0];
  },
});

export const states = {
  designTreeData,
  hoveredComponents,
  dragging,
  selectedNodes,
};

export const actions = {
  /** 根据 id 从树中查找 node */
  findNodeById: (
    nodeId: string,
    nodeList: NodeData[] | SlotsChildren = designTreeData.nodeData
  ): NodeData | null => {
    const iterateNodeList = (
      nodeList: NodeData[] | SlotsChildren
    ): NodeData | null => {
      if (Array.isArray(nodeList)) {
        for (const node of nodeList) {
          if (node.id === nodeId) {
            return node;
          }
          if (node.children) {
            const found = iterateNodeList(node.children as SlotsChildren);
            if (found) {
              return found;
            }
          }
        }
      } else {
        for (const key in nodeList) {
          const childrenArray = nodeList[key];
          if (Array.isArray(childrenArray)) {
            for (const node of childrenArray) {
              if (node.id === nodeId) {
                return node;
              }
              if (node.children) {
                const found = iterateNodeList(node.children as SlotsChildren);
                if (found) {
                  return found;
                }
              }
            }
          }
        }
      }
      return null;
    };

    return iterateNodeList(nodeList);
  },
  /** 选择 node */
  selectNode: (ids: string[]) => {
    const uniqueIds = Array.from(new Set(ids));
    selectedNodes.selectedIds = uniqueIds;
  },
  replaceNodeData: (data: NodeData[]) => {
    designTreeData.nodeData = data;
  },
  /** 切换悬停组件高亮 */
  switchHoveredComponent: (id: string, hovered: boolean) => {
    if (hovered) {
      if (!hoveredComponents.ids.includes(id)) {
        hoveredComponents.ids.push(id);
      }
    } else {
      hoveredComponents.ids = hoveredComponents.ids.filter(
        (componentId) => componentId !== id
      );
    }
  },
  /** 修改拖拽状态 */
  startDragging: (id: string) => {
    dragging.draggingId = id;
  },
  stopDragging: () => {
    dragging.draggingId = null;
  },
  /** 初始化节点树 */
  initTreeData: (data: NodeData[]) => {
    designTreeData.nodeData = data;
  },
  insertNode: (
    newNode: DeepReadonly<NodeData>,
    referenceNodeId: string,
    position: DocumentInsertionPosition,
    slotName?: string
  ) => {
    return actions._insertNode(
      designTreeData.nodeData,
      newNode,
      referenceNodeId,
      position,
      slotName
    );
  },
  _insertNode: (
    nodeList: NodeData[] | SlotsChildren,
    newNode: DeepReadonly<NodeData>,
    referenceNodeId: string,
    position: DocumentInsertionPosition,
    slotName?: string
  ): boolean => {
    if (position === "inner" && (slotName || slotName === "")) {
      if (Array.isArray(nodeList)) {
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].id === referenceNodeId) {
            if (slotName === "") {
              if (!Array.isArray(nodeList[i].children)) {
                nodeList[i].children = [];
              }
              (nodeList[i].children as DeepReadonly<NodeData>[]).push(newNode);
            } else {
              if (!nodeList[i].children) {
                nodeList[i].children = {};
              }
              const children = nodeList[i].children as SlotsChildren;
              if (!children[slotName]) {
                children[slotName] = [];
              }
              const slot = children[slotName] as DeepReadonly<NodeData>[];
              slot.push(newNode);
            }
            return true;
          }
          // 递归查找
          if (nodeList[i].children) {
            const inserted = actions._insertNode(
              nodeList[i].children as SlotsChildren,
              newNode,
              referenceNodeId,
              position,
              slotName
            );
            if (inserted) return true;
          }
        }
      } else {
        for (const key in nodeList) {
          if (Array.isArray(nodeList[key])) {
            const childrenArray = nodeList[key] as NodeData[];
            for (let i = 0; i < childrenArray.length; i++) {
              if (childrenArray[i].id === referenceNodeId) {
                if (slotName === "") {
                  if (!Array.isArray(childrenArray[i].children)) {
                    childrenArray[i].children = [];
                  }
                  (childrenArray[i].children as DeepReadonly<NodeData>[]).push(
                    newNode
                  );
                } else {
                  if (!childrenArray[i].children) {
                    childrenArray[i].children = {};
                  }
                  const children = childrenArray[i].children as SlotsChildren;
                  if (!children[slotName]) {
                    children[slotName] = [];
                  }
                  const slot = children[slotName] as DeepReadonly<NodeData>[];
                  slot.push(newNode);
                }
                return true;
              }
              // 递归查找
              if (childrenArray[i].children) {
                const inserted = actions._insertNode(
                  childrenArray[i].children as SlotsChildren,
                  newNode,
                  referenceNodeId,
                  position,
                  slotName
                );
                if (inserted) return true;
              }
            }
          } else if ((nodeList[key] as NodeData).id === referenceNodeId) {
            const slotNode = nodeList[key] as NodeData;
            if (slotName === "") {
              if (!Array.isArray(slotNode.children)) {
                slotNode.children = [];
              }
              (slotNode.children as DeepReadonly<NodeData>[]).push(newNode);
            } else {
              if (!slotNode.children) {
                slotNode.children = {};
              }
              const children = slotNode.children as SlotsChildren;
              if (!children[slotName]) {
                children[slotName] = [];
              }
              const slot = children[slotName] as DeepReadonly<NodeData>[];
              slot.push(newNode);
            }
            return true;
          }
        }
      }
      return false;
    } else {
      if (Array.isArray(nodeList)) {
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].id === referenceNodeId) {
            if (position === "before") {
              (nodeList as DeepReadonly<NodeData>[]).splice(i, 0, newNode);
            } else if (position === "after") {
              (nodeList as DeepReadonly<NodeData>[]).splice(i + 1, 0, newNode);
            }
            return true;
          }
          // 递归查找
          if (nodeList[i].children) {
            const inserted = actions._insertNode(
              nodeList[i].children as SlotsChildren,
              newNode,
              referenceNodeId,
              position
            );
            if (inserted) return true;
          }
        }
      } else {
        for (const key in nodeList) {
          if (Array.isArray(nodeList[key])) {
            const childrenArray = nodeList[key] as NodeData[];
            for (let i = 0; i < childrenArray.length; i++) {
              if (childrenArray[i].id === referenceNodeId) {
                if (position === "before") {
                  (childrenArray as DeepReadonly<NodeData>[]).splice(
                    i,
                    0,
                    newNode
                  );
                } else if (position === "after") {
                  (childrenArray as DeepReadonly<NodeData>[]).splice(
                    i + 1,
                    0,
                    newNode
                  );
                }
                return true;
              }
              // 递归查找
              if (childrenArray[i].children) {
                const inserted = actions._insertNode(
                  childrenArray[i].children as SlotsChildren,
                  newNode,
                  referenceNodeId,
                  position
                );
                if (inserted) return true;
              }
            }
          } else if ((nodeList[key] as NodeData).id === referenceNodeId) {
            if (position === "before" || position === "after") {
              const slotNode = nodeList[key] as NodeData;
              if (!Array.isArray(nodeList[key])) {
                nodeList[key] = [slotNode];
              }
              const index = (nodeList[key] as NodeData[]).indexOf(slotNode);
              if (position === "before") {
                (nodeList[key] as DeepReadonly<NodeData>[]).splice(
                  index,
                  0,
                  newNode
                );
              } else if (position === "after") {
                (nodeList[key] as DeepReadonly<NodeData>[]).splice(
                  index + 1,
                  0,
                  newNode
                );
              }
              return true;
            }
          }
        }
      }
      return false;
    }
  },
  /** 移动某个 node 到其他 node */
  moveNode: (
    nodeToMove: DeepReadonly<NodeData>,
    target: DeepReadonly<NodeData>,
    pos: DocumentInsertionPosition,
    slotName?: string
  ) => {
    if (pos === "not-allowed") {
      console.warn("不允许移动当前节点。");
      return;
    }

    const removeNode = (
      nodeList: NodeData[] | SlotsChildren,
      nodeId: string
    ): NodeData | null => {
      if (Array.isArray(nodeList)) {
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].id === nodeId) {
            return nodeList.splice(i, 1)[0];
          }
          if (nodeList[i].children) {
            const removedNode = removeNode(
              nodeList[i].children as SlotsChildren,
              nodeId
            );
            if (removedNode) return removedNode;
          }
        }
      } else {
        for (const key in nodeList) {
          if (Array.isArray(nodeList[key])) {
            const childrenArray = nodeList[key] as NodeData[];
            for (let i = 0; i < childrenArray.length; i++) {
              if (childrenArray[i].id === nodeId) {
                return childrenArray.splice(i, 1)[0];
              }
              if (childrenArray[i].children) {
                const removedNode = removeNode(
                  childrenArray[i].children as SlotsChildren,
                  nodeId
                );
                if (removedNode) return removedNode;
              }
            }
          } else if ((nodeList[key] as NodeData).id === nodeId) {
            const removedNode = nodeList[key] as NodeData;
            delete nodeList[key];
            return removedNode;
          }
        }
      }
      return null;
    };

    const fromParent = designTreeData.nodeData;
    const targetParent = designTreeData.nodeData;

    const nodeRemoved = removeNode(fromParent, nodeToMove.id);
    if (nodeRemoved) {
      const success = actions._insertNode(
        targetParent,
        nodeRemoved,
        target.id,
        pos,
        slotName
      );
      ensure(success, "插入节点错误。");
    }
  },
  /** 更新节点设置 */
  updateNodeSettings: (nodeId: string, newSettings: StaticProps) => {
    const updateSettingsRecursive = (
      nodeList: NodeData[] | SlotsChildren
    ): boolean => {
      if (Array.isArray(nodeList)) {
        for (const node of nodeList) {
          if (node.id === nodeId) {
            node.settings = newSettings;
            return true;
          }
          if (node.children) {
            const updated = updateSettingsRecursive(
              node.children as SlotsChildren
            );
            if (updated) return true;
          }
        }
      } else {
        for (const key in nodeList) {
          const childrenArray = nodeList[key] as NodeData[];
          for (const node of childrenArray) {
            if (node.id === nodeId) {
              node.settings = newSettings;
              return true;
            }
            if (node.children) {
              const updated = updateSettingsRecursive(
                node.children as SlotsChildren
              );
              if (updated) return true;
            }
          }
        }
      }
      return false;
    };

    const success = updateSettingsRecursive(designTreeData.nodeData);
    ensure(success, "更新节点设置失败。");
  },
};
