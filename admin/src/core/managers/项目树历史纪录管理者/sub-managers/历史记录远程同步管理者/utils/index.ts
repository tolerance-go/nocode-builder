import { ProjectDiffDto } from '@/_gen/api';

import { handleAdditions } from './handleAdditions';
import {
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '@/core/managers/UIStoreManager';
// import { handleUpdates } from './handleUpdates';

// /**
//  * 处理删除操作
//  * @param diffResult - 比较树的结果
//  * @param oldNodeDataRecord - key 到树节点数据的映射
//  * @returns 包含需要删除的项目和项目组ID的对象
//  */
// function handleDeletions(
//   diffResult: DiffResult<ProjectStructureTreeDataNode>,
//   oldNodeDataRecord: ProjectTreeNodeDataRecord,
// ) {
//   const projectIdsToDelete: number[] = [];
//   const projectGroupIdsToDelete: number[] = [];

//   diffResult.删除.recordItems.forEach((node) => {
//     const recordItem = oldNodeDataRecord[node.key];
//     if (recordItem.type === 'file') {
//       projectIdsToDelete.push(recordItem.id);
//     } else if (recordItem.type === 'folder') {
//       projectGroupIdsToDelete.push(recordItem.id);
//     }
//   });

//   return { projectIdsToDelete, projectGroupIdsToDelete };
// }

/**
 * 将 DiffResult<ProjectStructureTreeDataNode> 转换为 ProjectDiffDto
 * @param diffResult - 比较树的结果
 * @param _oldNodeDataRecord - key 到树节点数据的映射
 * @param newNodeDataRecord - key 到树节点数据的映射
 * @returns ProjectDiffDto
 */
export function convertDiffResultToProjectDiffDto(
  diffResult: DiffResult<ProjectStructureTreeDataNode>,
  _oldNodeDataRecord?: ProjectTreeNodeDataRecord,
  newNodeDataRecord?: ProjectTreeNodeDataRecord,
): ProjectDiffDto {
  const additions = handleAdditions(diffResult, newNodeDataRecord!);
  // const { projectsToUpdate, projectGroupsToUpdate } = handleUpdates(
  //   diffResult,
  //   newNodeDataRecord!,
  // );
  // const { projectIdsToDelete, projectGroupIdsToDelete } = handleDeletions(
  //   diffResult,
  //   oldNodeDataRecord!,
  // );
  return {
    additions,
    // projectsToUpdate,
    // projectGroupsToUpdate,
    // projectIdsToDelete,
    // projectGroupIdsToDelete,
    projectsToUpdate: [],
    projectGroupsToUpdate: [],
    projectIdsToDelete: [],
    projectGroupIdsToDelete: [],
  };
}
