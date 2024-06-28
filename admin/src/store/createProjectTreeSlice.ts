import { ProjectStructureTreeDataNode } from "@/types";
import { StateCreator } from "zustand";

export type ProjectTreeStates = {
  projectStructureTreeData: ProjectStructureTreeDataNode[];
};

export type ProjectTreeActions = {
  initProjectStructureTreeData: (data: ProjectStructureTreeDataNode[]) => void;
};

export type ProjectTreeSlice = ProjectTreeStates & ProjectTreeActions;

export const createProjectTreeSlice: StateCreator<
  ProjectTreeSlice,
  [],
  [],
  ProjectTreeSlice
> = (set) => ({
  projectStructureTreeData: [],
  initProjectStructureTreeData: (data) =>
    set({ projectStructureTreeData: data }),
});
