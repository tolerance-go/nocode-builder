import { createSelector } from 'reselect';
import { RootState } from '@/modules/界面状态管理器模块';

export const selectProjectStructureTreeData = (state: RootState) =>
  state.projectTree.项目结构树;

export const selectProjectStructureTreeNodeDataRecord = (state: RootState) =>
  state.projectTree.项目树节点数据;

export const selectProjectStructureTreeNodeDataRecordItem = createSelector(
  [
    selectProjectStructureTreeNodeDataRecord,
    (_state, nodeKey: string) => nodeKey,
  ],
  (projectStructureTreeDataRecord, nodeKey) =>
    projectStructureTreeDataRecord[nodeKey],
);
