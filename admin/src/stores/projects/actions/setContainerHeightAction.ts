import { treeStore } from "../stores";

export const setContainerHeightAction = (h: number) => {
  treeStore.containerHeight = Promise.resolve(h);
};
