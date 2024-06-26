import { treeStore } from "../stores";

export const setExpandedKeysAction = (newExpandedKeys: React.Key[]) => {
  treeStore.expandedKeys = newExpandedKeys;
};
