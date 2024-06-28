import { ProjectStructureTreeDataNode } from "@/types";
import { StateCreator } from "zustand";

export type ProjectTreeStates = {
  projectTreeData: ProjectStructureTreeDataNode[];
};

export type ProjectTreeActions = {
  initProjectTreeData: (projectTreeData: ProjectStructureTreeDataNode[]) => void;
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
