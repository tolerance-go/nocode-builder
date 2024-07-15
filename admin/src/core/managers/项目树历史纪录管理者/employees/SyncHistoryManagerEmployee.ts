import { api } from '@/globals';
import {
  compareTrees,
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '../../UIStoreManager';
import { 历史记录 } from '../machines';
import {
  ProjectDiffDto,
  ProjectCreateDto,
  ProjectGroupCreateDto,
  ProjectUpdateWithIdDto,
  ProjectGroupUpdateWithIdDto,
} from '@/_gen/api';
import { last } from 'lodash-es';

/**
 * 将 DiffResult<ProjectStructureTreeDataNode> 转换为 ProjectDiffDto
 * @param diffResult - 比较树的结果
 * @param newNodeDataRecord - key 到树节点数据的映射
 * @returns ProjectDiffDto
 */
function convertDiffResultToProjectDiffDto(
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
          type: 'file', // assuming type is 'file', adjust accordingly
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

// 扩展历史记录，增加同步类型属性
export type 扩展历史记录 = 历史记录 & {
  同步类型: '未同步' | '已同步' | '同步失败'; // 新增的同步类型属性
};

export class SyncHistoryManagerEmployee {
  private historyA: 扩展历史记录[] = [];
  private historyB: 扩展历史记录[] = [];

  constructor(
    initialHistoryA: 扩展历史记录[],
    initialHistoryB: 扩展历史记录[],
  ) {
    this.historyA = initialHistoryA;
    this.historyB = initialHistoryB;
  }

  // 比较 historyA 和 historyB 的差异
  private compareHistories() {
    const lastA = last(this.historyA);
    const lastB = last(this.historyB);

    const results = compareTrees<ProjectStructureTreeDataNode>(
      lastA?.state.treeNodes ?? [],
      lastB?.state.treeNodes ?? [],
      (oldNode, newNode) => {
        return (
          lastA?.state.treeDataRecord[oldNode.key].title !==
          lastB?.state.treeDataRecord[newNode.key].title
        );
      },
    );

    return {
      diffResults: results,
      oldTreeDataRecord: lastA?.state.treeDataRecord,
      newTreeDataRecord: lastB?.state.treeDataRecord,
    };
  }

  // 同步差异到远程数据库
  private async syncDifferences(
    differences: DiffResult<ProjectStructureTreeDataNode>,
    oldTreeDataRecord?: ProjectTreeNodeDataRecord,
    newTreeDataRecord?: ProjectTreeNodeDataRecord,
  ): Promise<void> {
    // 实现你的同步逻辑，例如通过 API 请求发送差异数据到远程数据库
    api.syncs.applyProjectDiff(
      convertDiffResultToProjectDiffDto(
        differences,
        oldTreeDataRecord,
        newTreeDataRecord,
      ),
    );
  }

  // 执行同步操作
  public async sync(): Promise<void> {
    const results = this.compareHistories();
    await this.syncDifferences(
      results.diffResults,
      results.oldTreeDataRecord,
      results.newTreeDataRecord,
    );
  }

  // 接受新的历史记录数组，并更新 A 和 B
  public updateHistories(newHistory: 扩展历史记录[]): void {
    this.historyA = this.historyB;
    this.historyB = newHistory;
  }
}
