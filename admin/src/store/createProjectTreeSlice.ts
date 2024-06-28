import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from "@/types";
import { ImmerStateCreator } from "@/utils";

export type ProjectTreeStates = {
  projectStructureTreeData: ProjectStructureTreeDataNode[];
  projectTreeDataRecord: ProjectTreeNodeDataRecord;
  hasInitProjectTreeDataMeta: boolean;
};

export type ProjectTreeActions = {
  updateProjectStructureTreeData: (
    data: ProjectStructureTreeDataNode[],
  ) => void;
  updateProjectTreeDataRecord: (data: ProjectTreeNodeDataRecord) => void;
  initProjectTreeDataMeta: (args: {
    projectStructureTreeData: ProjectStructureTreeDataNode[];
    projectStructureTreeDataRecord: ProjectTreeNodeDataRecord;
  }) => void;
};

export type ProjectTreeSlice = ProjectTreeStates & ProjectTreeActions;

export const createProjectTreeSlice: ImmerStateCreator<
  ProjectTreeSlice,
  ProjectTreeSlice
> = (set) => ({
  projectStructureTreeData: [],
  projectTreeDataRecord: {},
  hasInitProjectTreeDataMeta: false,
  updateProjectStructureTreeData: (data) => {
    set((state) => {
      state.projectStructureTreeData = data;
    });
  },
  updateProjectTreeDataRecord: (data) => {
    set({ projectTreeDataRecord: data });
  },
  initProjectTreeDataMeta: ({
    projectStructureTreeData,
    projectStructureTreeDataRecord,
  }) => {
    set((state) => {
      state.projectStructureTreeData = projectStructureTreeData;
      state.projectTreeDataRecord = projectStructureTreeDataRecord;
      state.hasInitProjectTreeDataMeta = true;
    });
  },
});
