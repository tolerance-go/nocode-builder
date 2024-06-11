import { globalEventBus } from "@/globals/eventBus";
import { DocumentInsertionPosition } from "@/types";
import { DeepReadonly } from "@/utils/ensure/types";
import { proxy, subscribe } from "valtio";

type StaticPropsValue = string | number | boolean | null | undefined;

type StaticProps = {
  [key: string]: StaticPropsValue | StaticProps;
};

export type NodePlainChild = string | number | boolean | null | undefined;

export type SlotsChildren = {
  [key: string]: NodeData[] | NodeData | NodePlainChild;
};

export type NodeData = {
  id: string;
  elementType: string;
  children?: SlotsChildren | NodeData[] | NodePlainChild;
  staticProps: StaticProps;
};

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
  draggingId: string | null;
}>({
  draggingId: null,
});

export const states = {
  designTreeData,
  hoveredComponents,
  dragging,
};

export const actions = {
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
  /** 移动某个 node 到其他 node */
  moveNode: (
    nodeToMove: DeepReadonly<NodeData>,
    target: DeepReadonly<NodeData>,
    pos: DocumentInsertionPosition
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

    const insertNode = (
      nodeList: NodeData[] | SlotsChildren,
      newNode: NodeData,
      referenceNodeId: string,
      position: DocumentInsertionPosition
    ): boolean => {
      if (Array.isArray(nodeList)) {
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].id === referenceNodeId) {
            if (position === "before") {
              nodeList.splice(i, 0, newNode);
            } else if (position === "after") {
              nodeList.splice(i + 1, 0, newNode);
            }
            return true;
          }
          if (nodeList[i].children) {
            const inserted = insertNode(
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
                  childrenArray.splice(i, 0, newNode);
                } else if (position === "after") {
                  childrenArray.splice(i + 1, 0, newNode);
                }
                return true;
              }
              if (childrenArray[i].children) {
                const inserted = insertNode(
                  childrenArray[i].children as SlotsChildren,
                  newNode,
                  referenceNodeId,
                  position
                );
                if (inserted) return true;
              }
            }
          } else if ((nodeList[key] as NodeData).id === referenceNodeId) {
            if (position === "before") {
              nodeList[key] = [newNode, nodeList[key] as NodeData];
            } else if (position === "after") {
              nodeList[key] = [nodeList[key] as NodeData, newNode];
            }
            return true;
          }
        }
      }
      return false;
    };

    const fromParent = designTreeData.nodeData;
    const targetParent = designTreeData.nodeData;

    const nodeRemoved = removeNode(fromParent, nodeToMove.id);
    if (nodeRemoved) {
      insertNode(targetParent, nodeRemoved, target.id, pos);
    }
  },
};
