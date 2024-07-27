import { ViewKey } from '@/common/types';
import { ProjectTreeStates } from '../states';
import { ProjectStructureTreeDataNode } from '../../界面状态仓库模块/types';
import { findNode } from './tree';

export const 查询项目树中的节点 = (
  state: ProjectTreeStates,
  key: ViewKey,
): ProjectStructureTreeDataNode | null => {
  return findNode(state.项目结构树, key);
};
