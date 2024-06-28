import {
  ProjectStructureTreeDataNode,
  ProjectStructureTreeNodeDataRecord,
} from "@/types";
import { ImmerStateCreator } from "@/utils";

export type ProjectTreeStates = {
  projectStructureTreeData: ProjectStructureTreeDataNode[];
  projectStructureTreeDataRecord: ProjectStructureTreeNodeDataRecord;
};

export type ProjectTreeActions = {
  updateProjectStructureTreeData: (
    data: ProjectStructureTreeDataNode[],
  ) => void;
  updateProjectStructureTreeDataRecord: (
    data: ProjectStructureTreeNodeDataRecord,
  ) => void;
};

export type ProjectTreeSlice = ProjectTreeStates & ProjectTreeActions;

export const createProjectTreeSlice: ImmerStateCreator<
  ProjectTreeSlice,
  ProjectTreeSlice
> = (set) => ({
  projectStructureTreeData: [],
  projectStructureTreeDataRecord: {},
  updateProjectStructureTreeData: (data) =>
    set({ projectStructureTreeData: data }),
  updateProjectStructureTreeDataRecord: (data) =>
    set({ projectStructureTreeDataRecord: data }),
});
