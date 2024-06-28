import {
  ProjectStructureTreeDataNode,
  ProjectStructureTreeNodeDataRecord,
} from "@/types";
import { ImmerStateCreator } from "@/utils";

export type ProjectTreeStates = {
  projectStructureTreeData: ProjectStructureTreeDataNode[];
  projectStructureTreeDataRecord: ProjectStructureTreeNodeDataRecord;
  hasInitProjectStructureTreeDataMeta: boolean;
};

export type ProjectTreeActions = {
  updateProjectStructureTreeData: (
    data: ProjectStructureTreeDataNode[],
  ) => void;
  updateProjectStructureTreeDataRecord: (
    data: ProjectStructureTreeNodeDataRecord,
  ) => void;
  initProjectStructureTreeDataMeta: (args: {
    projectStructureTreeData: ProjectStructureTreeDataNode[];
    projectStructureTreeDataRecord: ProjectStructureTreeNodeDataRecord;
  }) => void;
};

export type ProjectTreeSlice = ProjectTreeStates & ProjectTreeActions;

export const createProjectTreeSlice: ImmerStateCreator<
  ProjectTreeSlice,
  ProjectTreeSlice
> = (set) => ({
  projectStructureTreeData: [],
  projectStructureTreeDataRecord: {},
  hasInitProjectStructureTreeDataMeta: false,
  updateProjectStructureTreeData: (data) => {
    set((state) => {
      state.projectStructureTreeData = data;
    });
  },
  updateProjectStructureTreeDataRecord: (data) =>
    set({ projectStructureTreeDataRecord: data }),
  initProjectStructureTreeDataMeta: ({
    projectStructureTreeData,
    projectStructureTreeDataRecord,
  }) => {
    set((state) => {
      state.projectStructureTreeData = projectStructureTreeData;
      state.projectStructureTreeDataRecord = projectStructureTreeDataRecord;
      state.hasInitProjectStructureTreeDataMeta = true;
    });
  },
});
