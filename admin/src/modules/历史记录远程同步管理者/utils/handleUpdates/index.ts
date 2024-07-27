import {
  ProjectUpdateWithIdDto,
  ProjectGroupUpdateWithIdDto,
} from '@/_gen/api';
import {
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '@/modules/界面状态管理器模块';

/**
 * 处理更新操作
 * @param diffResult - 比较树的结果
 * @param newNodeDataRecord - key 到树节点数据的映射
 * @returns 包含需要更新的项目和项目组的对象
 */
export function handleUpdates(
  diffResult: DiffResult<ProjectStructureTreeDataNode>,
  newNodeDataRecord: ProjectTreeNodeDataRecord,
) {
  const projectsToUpdate: ProjectUpdateWithIdDto[] = [];
  const projectGroupsToUpdate: ProjectGroupUpdateWithIdDto[] = [];

  diffResult.更新?.forEach((更新操作) => {
    const newNode = 更新操作.newNode;
    const newNodeData = newNodeDataRecord[newNode.key];
    if (newNodeData.type === 'file') {
      projectsToUpdate.push({
        id: newNodeData.recordId,
        name: newNodeData.title,
        projectGroupId: 更新操作.节点key
          ? newNodeDataRecord[更新操作.节点key].recordId
          : undefined,
      });
    } else if (newNodeData.type === 'folder') {
      projectGroupsToUpdate.push({
        id: newNodeData.recordId,
        name: newNodeData.title,
        parentGroupId: 更新操作.节点key
          ? newNodeDataRecord[更新操作.节点key].recordId
          : undefined,
      });
    }
  });

  return { projectsToUpdate, projectGroupsToUpdate };
}
