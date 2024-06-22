import { proxy } from "valtio";
import { SearchNodeSourceData } from "../../types/blueMap";

/**
 * 搜索节点从哪个 port 拖出来的
 */
const searchNodeSourcePort = proxy<{
  source?: SearchNodeSourceData;
}>({
  source: undefined,
});

export const states = proxy({
  searchNodeSourcePort,
});

export const actions = {
  setSearchNodeSourcePort: (nodeId: string, portId: string) => {
    searchNodeSourcePort.source = {
      nodeId,
      portId,
    };
  },
  clearSearchNodeSourcePort: () => {
    searchNodeSourcePort.source = undefined;
  },
};
