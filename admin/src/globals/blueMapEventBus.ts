import { EventBus } from "@/utils/eventBus";

export type BlueMapEventMaps = {
  /**
   * 选中蓝图搜索节点中的项
   */
  selectBlueMapSearchPanelItem: {
    configId: string;
  };
  /**
   * 当拖拽蓝图 port 准备连接时
   */
  draggingBlueMapPort: {
    sourceNodeId: string;
    sourcePortId: string;
  };
  /**
   * 当拖拽蓝图 port 准备连接时
   */
  dragBlueMapPortEnd: undefined;
};

export const blueMapEventBus = new EventBus<BlueMapEventMaps>();
