import { ProjectStructureTreeDataNode } from '@/types';
import { ProjectTreeStates } from '../slices/projectTree';
import { findNode } from './tree';

export const 查询项目树中的节点 = (
  state: ProjectTreeStates,
  key: string,
): ProjectStructureTreeDataNode | null => {
  return findNode(state.项目节点树, key);
};

export * from './tree';
