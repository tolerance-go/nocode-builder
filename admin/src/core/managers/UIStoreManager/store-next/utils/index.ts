import { ProjectStructureTreeDataNode } from '@/types';
import { ProjectTreeStates } from '../slices/projectTree';

export const findProjectStructureTreeNode = (
  state: ProjectTreeStates,
  key: string,
): ProjectStructureTreeDataNode | null => {
  const findNode = (
    nodes: ProjectStructureTreeDataNode[],
  ): ProjectStructureTreeDataNode | null => {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const found = findNode(node.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  return findNode(state.projectStructureTreeData);
};
