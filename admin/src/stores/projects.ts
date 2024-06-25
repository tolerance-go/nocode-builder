import { proxy } from "valtio";

const addFolderLoading = proxy({
  loading: false,
});

const addFileLoading = proxy({
  loading: false,
});

export const states = proxy({
  addFolderLoading,
  addFileLoading,
});
