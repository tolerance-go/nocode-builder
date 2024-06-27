import { convertProjectTreeToMap } from "@/stores/_utils/convertProjectTreeToMap";
import { populateParentMap } from "@/stores/_utils/populateParentMap";
import { ProjectTreeDataNode } from "@/types";
import { ProjectTreeTimelineNode } from "@/types/timeline";
import { derive } from "derive-valtio";
import { proxy } from "valtio";
import { proxyWithHistory } from "valtio-history";

export const projectTreeHistoryState = proxyWithHistory({
  data: [] as ProjectTreeDataNode[],
});

export const projectTreeTimelineState = proxy({
  data: [] as ProjectTreeTimelineNode[],
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
    const map = new Map<string, ProjectTreeDataNode>();
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
