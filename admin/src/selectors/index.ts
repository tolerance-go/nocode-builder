import { createSelector } from "reselect";
import { ProjectTreeStates } from "@/store/createProjectTreeSlice";

export const selectProjectStructureTreeData = (state: ProjectTreeStates) =>
  state.projectStructureTreeData;

export const selectProjectStructureTreeNodeDataRecord = (
  state: ProjectTreeStates,
) => state.projectStructureTreeDataRecord;

export const selectProjectStructureTreeNodeDataRecordItem = createSelector(
  [
    selectProjectStructureTreeNodeDataRecord,
    (_state, nodeKey: string) => nodeKey,
  ],
  (projectStructureTreeDataRecord, nodeKey) =>
    projectStructureTreeDataRecord[nodeKey],
);
