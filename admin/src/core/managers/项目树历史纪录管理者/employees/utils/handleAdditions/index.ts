import {
  ProjectCreateDto,
  ProjectGroupCreateWithChildrenDto,
} from '@/_gen/api';
import {
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '@/core/managers/UIStoreManager';

/**
 * 处理新增操作
 * @param diffResult - 比较树的结果
 * @param newNodeDataRecord - key 到树节点数据的映射
 * @returns 构建的树结构数组
 */
export function handleAdditions(
  diffResult: DiffResult<ProjectStructureTreeDataNode>,
  newNodeDataRecord: ProjectTreeNodeDataRecord,
): (ProjectGroupCreateWithChildrenDto | ProjectCreateDto)[][] {
  const processNode = (
    node: ProjectStructureTreeDataNode,
    currentGroup: (ProjectGroupCreateWithChildrenDto | ProjectCreateDto)[],
  ) => {
    const recordItem = newNodeDataRecord[node.key];
    if (recordItem.type === 'file') {
      const projectNode: ProjectCreateDto = {
        name: recordItem.title,
        type: recordItem.projectFileType,
      };
      currentGroup.push(projectNode);
    } else if (recordItem.type === 'folder') {
      const groupNode: ProjectGroupCreateWithChildrenDto = {
        name: recordItem.title,
        children: [],
      };
      currentGroup.push(groupNode);

      // 递归处理子节点
      node.children?.forEach((childNode) => {
        if (!groupNode.children) {
          groupNode.children = [];
        }
        processNode(childNode, groupNode.children);
      });
    }
  };

  return diffResult.新增.map((新增操作) => {
    const groupResult: (
      | ProjectGroupCreateWithChildrenDto
      | ProjectCreateDto
    )[] = [];
    新增操作.recordItems.forEach((node) => {
      processNode(node, groupResult);
    });
    return groupResult;
  });
}
