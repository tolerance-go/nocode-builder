import { convertProjectTreeToMap } from "@/stores/_utils/convertProjectTreeToMap";
import { populateParentMap } from "@/stores/_utils/populateParentMap";
import { ProjectStructureTreeDataNode } from "@/types";
import { derive } from "derive-valtio";
import { proxy } from "valtio";
import { proxyWithHistory } from "valtio-history";
import { proxySet } from "valtio/utils";

export const projectTreeHistoryState = proxyWithHistory({
  data: [] as ProjectStructureTreeDataNode[],
});

export const projectTreeTimelineState = derive({
  data: (get) => {
    const state = get(projectTreeHistoryState);
    return state.history.nodes.map((item, index) => {
      return {
        treeData: item.snapshot.data,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        index,
      };
    });
  },
  index: (get) => {
    return get(projectTreeHistoryState).currentIndex;
  },
});

export const projectTreeState = proxy({
  loading: false,
  containerHeight: 0,
  expandedKeys: [] as string[],
  treeData: projectTreeHistoryState,
  selectedKey: null as string | null,
});

// 构建 treeMapStore
export const projectTreeMapState = derive({
  data: (get) => {
    const treeData = get(projectTreeState).treeData;
    const map = new Map<string, ProjectStructureTreeDataNode>();
    treeData.value.data.forEach((node) => convertProjectTreeToMap(node, map));
    return map;
  },
});

// 构建 parentMapStore，用于存储节点的父节点关系
export const projectTreeNodeParentMapState = derive({
  data: (get) => {
    const treeData = get(projectTreeState).treeData;
    const parentMap = new Map<string, string | null>();
    treeData.value.data.forEach((node) => populateParentMap(node, parentMap));
    return parentMap;
  },
});

export const projectTreeNodeEditingState = proxySet<string>([]);

/** 临时的节点，新增进入编辑，但是还没保存的 */
export const projectTreeTempNodeState = proxySet<string>([]);
