import { createSelector } from 'reselect';
import { RootState } from '@/modules/ui/界面状态仓库模块';
import { ViewKey } from '@/common/types';

export const selectProjectStructureTreeData = (state: RootState) =>
  state.projectTree.项目结构树;

export const selectProjectStructureTreeNodeDataRecord = (state: RootState) =>
  state.projectTree.项目树节点数据;

export const selectProjectStructureTreeNodeDataRecordItem = createSelector(
  [
    selectProjectStructureTreeNodeDataRecord,
    (_state, nodeKey: ViewKey) => nodeKey,
  ],
  (projectStructureTreeDataRecord, nodeKey) =>
    projectStructureTreeDataRecord[nodeKey],
);
