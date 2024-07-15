import {
  ProjectDiffDto,
  ProjectGroupUpdateWithIdDto,
  ProjectUpdateWithIdDto,
} from '@/_gen/api';
import {
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '../../../UIStoreManager';
import { handleAdditions } from './handleAdditions';

/**
 * 处理更新操作
 * @param diffResult - 比较树的结果
 * @param newNodeDataRecord - key 到树节点数据的映射
 * @returns 包含需要更新的项目和项目组的对象
 */
function handleUpdates(
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
        id: newNodeData.id,
        name: newNodeData.title,
        projectGroupId: 更新操作.节点key
          ? newNodeDataRecord[更新操作.节点key].id
          : undefined,
      });
    } else if (newNodeData.type === 'folder') {
      projectGroupsToUpdate.push({
        id: newNodeData.id,
        name: newNodeData.title,
        parentGroupId: 更新操作.节点key
          ? newNodeDataRecord[更新操作.节点key].id
          : undefined,
      });
    }
  });

  return { projectsToUpdate, projectGroupsToUpdate };
}

/**
 * 处理删除操作
 * @param diffResult - 比较树的结果
 * @param oldNodeDataRecord - key 到树节点数据的映射
 * @returns 包含需要删除的项目和项目组ID的对象
 */
function handleDeletions(
  diffResult: DiffResult<ProjectStructureTreeDataNode>,
  oldNodeDataRecord: ProjectTreeNodeDataRecord,
) {
  const projectIdsToDelete: number[] = [];
  const projectGroupIdsToDelete: number[] = [];

  diffResult.删除.recordItems.forEach((node) => {
    const recordItem = oldNodeDataRecord[node.key];
    if (recordItem.type === 'file') {
      projectIdsToDelete.push(recordItem.id);
    } else if (recordItem.type === 'folder') {
      projectGroupIdsToDelete.push(recordItem.id);
    }
  });

  return { projectIdsToDelete, projectGroupIdsToDelete };
}

/**
 * 将 DiffResult<ProjectStructureTreeDataNode> 转换为 ProjectDiffDto
 * @param diffResult - 比较树的结果
 * @param oldNodeDataRecord - key 到树节点数据的映射
 * @param newNodeDataRecord - key 到树节点数据的映射
 * @returns ProjectDiffDto
 */
export function convertDiffResultToProjectDiffDto(
  diffResult: DiffResult<ProjectStructureTreeDataNode>,
  oldNodeDataRecord?: ProjectTreeNodeDataRecord,
  newNodeDataRecord?: ProjectTreeNodeDataRecord,
): ProjectDiffDto {
  const additions = handleAdditions(diffResult, newNodeDataRecord!);
  const { projectsToUpdate, projectGroupsToUpdate } = handleUpdates(
    diffResult,
    newNodeDataRecord!,
  );
  const { projectIdsToDelete, projectGroupIdsToDelete } = handleDeletions(
    diffResult,
    oldNodeDataRecord!,
  );
  return {
    additions,
    projectsToUpdate,
    projectGroupsToUpdate,
    projectIdsToDelete,
    projectGroupIdsToDelete,
  };
}
