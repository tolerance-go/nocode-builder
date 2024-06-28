import { ProjectTreeDataNode } from "@/types";
import { StateCreator } from "zustand";

export type ProjectTreeStates = {
  projectTreeData: ProjectTreeDataNode[];
};

export type ProjectTreeActions = {
  initProjectTreeData: (projectTreeData: ProjectTreeDataNode[]) => void;
};

export type ProjectTreeSlice = ProjectTreeStates & ProjectTreeActions;

export const createProjectTreeSlice: StateCreator<
  ProjectTreeSlice,
  [],
  [],
  ProjectTreeSlice
> = (set) => ({
  projectTreeData: [],
  initProjectTreeData: (data) => set({ projectTreeData: data }),
});
