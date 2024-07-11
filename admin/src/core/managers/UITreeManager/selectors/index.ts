import { createSelector } from 'reselect';
import { RootState } from '../../UIStoreManager';

export const selectProjectStructureTreeData = (state: RootState) =>
  state.projectTree.项目节点树;

export const selectProjectStructureTreeNodeDataRecord = (state: RootState) =>
  state.projectTree.树节点key到节点数据的映射;

export const selectProjectStructureTreeNodeDataRecordItem = createSelector(
  [
    selectProjectStructureTreeNodeDataRecord,
    (_state, nodeKey: string) => nodeKey,
  ],
  (projectStructureTreeDataRecord, nodeKey) =>
    projectStructureTreeDataRecord[nodeKey],
);
