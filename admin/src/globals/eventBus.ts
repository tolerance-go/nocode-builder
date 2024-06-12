import { NodeData } from "@/stores/designs";
import { EventBus } from "@/utils/eventBus";
import { DeepReadonly } from "@/utils/types";

export type EventMaps = {
  /**
   * 编辑器文本内容改变
   *
   * 初始化也会触发一次
   */
  editTextChange: {
    text: string;
    reason: "userEdit" | "syncNodeTree";
  };
  /**
   * 当节点树改变
   */
  nodeTreeChange: NodeData[];

  draggingHoveringNode: {
    node: DeepReadonly<NodeData> | null;
  };
  /**
   * 悬停鼠标接近悬停 node 中的插槽
   */
  draggingNestHoveringNodeSlot: {
    nodeMeta: {
      slotName: string;
      nodeId: string;
    } | null;
  };

  /**
   * 外部拖拽开始
   */
  externalDragStart: {
    nodeData: NodeData;
  };

  /**
   * 外部拖拽结束
   */
  externalDragEnd: {
    nodeData: NodeData;
  };
};

export const globalEventBus = new EventBus<EventMaps>();
