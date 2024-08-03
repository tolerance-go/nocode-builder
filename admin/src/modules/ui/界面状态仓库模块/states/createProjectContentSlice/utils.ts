import { ViewKey } from '@/common/types';
import { WidgetSlotTreeDataNode, WidgetTreeDataNode } from '../../types';

// 生成 derived_widget节点到父节点的映射
export const generateDerivedMapping = (
  widgetTree: WidgetTreeDataNode[],
): Record<ViewKey, ViewKey | null> => {
  const derivedMapping: Record<ViewKey, ViewKey | null> = {};

  const traverse = (
    nodes: (WidgetTreeDataNode | WidgetSlotTreeDataNode)[],
    parent: ViewKey | null,
  ) => {
    nodes.forEach((node) => {
      derivedMapping[node.key] = parent;
      if (node.children) {
        traverse(node.children, node.key);
      }
    });
  };

  traverse(widgetTree, null);
  return derivedMapping;
};
