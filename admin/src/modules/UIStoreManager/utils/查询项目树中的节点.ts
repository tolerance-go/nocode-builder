import { ViewKey } from '@/common/types';
import { ProjectTreeStates } from '../states';
import { ProjectStructureTreeDataNode } from '../types';
import { findNode } from './tree';

export const 查询项目树中的节点 = (
  state: ProjectTreeStates,
  key: ViewKey,
): ProjectStructureTreeDataNode | null => {
  return findNode(state.项目结构树, key);
};
