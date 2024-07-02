import { createSelector } from 'reselect';
import { RootState } from '../../UIStoreManager';

export const selectProjectStructureTreeData = (state: RootState) =>
  state.projectTree.projectStructureTreeData;

export const selectProjectStructureTreeNodeDataRecord = (state: RootState) =>
  state.projectTree.projectTreeDataRecord;

export const selectProjectStructureTreeNodeDataRecordItem = createSelector(
  [
    selectProjectStructureTreeNodeDataRecord,
    (_state, nodeKey: string) => nodeKey,
  ],
  (projectStructureTreeDataRecord, nodeKey) =>
    projectStructureTreeDataRecord[nodeKey],
);
