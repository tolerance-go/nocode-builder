import { ProjectTreeStates } from '@/store/createProjectTreeSlice';
import { createSelector } from 'reselect';

export const selectProjectStructureTreeData = (state: ProjectTreeStates) =>
  state.projectStructureTreeData;

export const selectProjectStructureTreeNodeDataRecord = (
  state: ProjectTreeStates,
) => state.projectTreeDataRecord;

export const selectProjectStructureTreeNodeDataRecordItem = createSelector(
  [
    selectProjectStructureTreeNodeDataRecord,
    (_state, nodeKey: string) => nodeKey,
  ],
  (projectStructureTreeDataRecord, nodeKey) =>
    projectStructureTreeDataRecord[nodeKey],
);
