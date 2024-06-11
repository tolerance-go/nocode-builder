import { NodeData } from "@/stores/designs";
import { EventBus } from "@/utils/eventBus";

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
};

export const globalEventBus = new EventBus<EventMaps>();
