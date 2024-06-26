import { treeStore } from "../stores";

export const setSelectedKeyAction = (newSelectedKey: React.Key | null) => {
  treeStore.selectedKey = newSelectedKey;
};
