import {
  ProjectDiffDto,
  ProjectCreateDto,
  ProjectGroupCreateDto,
  ProjectUpdateWithIdDto,
  ProjectGroupUpdateWithIdDto,
} from '@/_gen/api';
import {
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '../../UIStoreManager';

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
  const projectsToCreate: ProjectCreateDto[] = [];
  const projectGroupsToCreate: ProjectGroupCreateDto[] = [];
  const projectsToUpdate: ProjectUpdateWithIdDto[] = [];
  const projectGroupsToUpdate: ProjectGroupUpdateWithIdDto[] = [];
  const projectIdsToDelete: number[] = [];
  const projectGroupIdsToDelete: number[] = [];

  diffResult.新增.forEach((新增操作) => {
    新增操作.recordItems.forEach((node) => {
      const recordItem = newNodeDataRecord![node.key];
      if (recordItem.type === 'file') {
        projectsToCreate.push({
          name: recordItem.title,
          projectGroupId: 新增操作.父节点key
            ? newNodeDataRecord![新增操作.父节点key].id
            : undefined,
          type: recordItem.projectFileType,
        });
      } else if (recordItem.type === 'folder') {
        projectGroupsToCreate.push({
          name: recordItem.title,
          parentGroupId: 新增操作.父节点key
            ? newNodeDataRecord![新增操作.父节点key].id
            : undefined,
        });
      }
    });
  });

  diffResult.更新?.forEach((更新操作) => {
    const newNode = 更新操作.newNode;
    const newNodeData = newNodeDataRecord![newNode.key];
    if (newNodeData.type === 'file') {
      projectsToUpdate.push({
        id: newNodeData.id,
        name: newNodeData.title,
        projectGroupId: 更新操作.节点key
          ? newNodeDataRecord![更新操作.节点key].id
          : undefined,
      });
    } else if (newNodeData.type === 'folder') {
      projectGroupsToUpdate.push({
        id: newNodeData.id,
        name: newNodeData.title,
        parentGroupId: 更新操作.节点key
          ? newNodeDataRecord![更新操作.节点key].id
          : undefined,
      });
    }
  });

  diffResult.删除.recordItems.forEach((node) => {
    const recordItem = oldNodeDataRecord![node.key];
    if (recordItem.type === 'file') {
      projectIdsToDelete.push(recordItem.id);
    } else if (recordItem.type === 'folder') {
      projectGroupIdsToDelete.push(recordItem.id);
    }
  });

  return {
    projectsToCreate,
    projectGroupsToCreate,
    projectsToUpdate,
    projectGroupsToUpdate,
    projectIdsToDelete,
    projectGroupIdsToDelete,
  };
}
