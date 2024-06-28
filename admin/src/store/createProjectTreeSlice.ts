import { ProjectStructureTreeDataNode } from "@/types";
import { ImmerStateCreator } from "@/utils";

export type ProjectTreeStates = {
  projectStructureTreeData: ProjectStructureTreeDataNode[];
};

export type ProjectTreeActions = {
  initProjectStructureTreeData: (data: ProjectStructureTreeDataNode[]) => void;
};

export type ProjectTreeSlice = ProjectTreeStates & ProjectTreeActions;

export const createProjectTreeSlice: ImmerStateCreator<
  ProjectTreeSlice,
  ProjectTreeSlice
> = (set) => ({
  projectStructureTreeData: [],
  initProjectStructureTreeData: (data) =>
    set({ projectStructureTreeData: data }),
});
