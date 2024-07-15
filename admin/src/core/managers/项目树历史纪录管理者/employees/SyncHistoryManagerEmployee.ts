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
 * @param nodeDataRecord - key 到树节点数据的映射
 * @returns ProjectDiffDto
 */
function convertDiffResultToProjectDiffDto(
  diffResult: DiffResult<ProjectStructureTreeDataNode>,
  nodeDataRecord: ProjectTreeNodeDataRecord,
): ProjectDiffDto {
  const projectsToCreate: ProjectCreateDto[] = [];
  const projectGroupsToCreate: ProjectGroupCreateDto[] = [];
  const projectsToUpdate: ProjectUpdateWithIdDto[] = [];
  const projectGroupsToUpdate: ProjectGroupUpdateWithIdDto[] = [];
  const projectIdsToDelete: number[] = [];
  const projectGroupIdsToDelete: number[] = [];

  diffResult.新增.forEach((新增操作) => {
    新增操作.recordItems.forEach((node) => {
      const recordItem = nodeDataRecord[node.key];
      if (recordItem.type === 'file') {
        projectsToCreate.push({
          name: recordItem.title,
          projectGroupId: 新增操作.父节点key
            ? nodeDataRecord[新增操作.父节点key].id
            : undefined,
          type: 'file', // assuming type is 'file', adjust accordingly
        });
      } else if (recordItem.type === 'folder') {
        projectGroupsToCreate.push({
          name: recordItem.title,
          parentGroupId: 新增操作.父节点key
            ? nodeDataRecord[新增操作.父节点key].id
            : undefined,
        });
      }
    });
  });

  diffResult.更新?.forEach((更新操作) => {
    const node = 更新操作.newRecordItem;
    const recordItem = nodeDataRecord[node.key];
    if (recordItem.type === 'file') {
      projectsToUpdate.push({
        id: recordItem.id,
        name: node.title,
        projectGroupId: 更新操作.节点key
          ? nodeDataRecord[更新操作.节点key].id
          : undefined,
      });
    } else if (recordItem.type === 'folder') {
      projectGroupsToUpdate.push({
        id: recordItem.id,
        name: node.title,
        parentGroupId: 更新操作.节点key
          ? nodeDataRecord[更新操作.节点key].id
          : undefined,
      });
    }
  });

  diffResult.删除.recordItems.forEach((node) => {
    const recordItem = nodeDataRecord[node.key];
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

    const results = compareTrees(
      lastA?.state.treeNodes ?? [],
      lastB?.state.treeNodes ?? [],
      (nodeA, nodeB) =>
        lastA?.state.treeDataRecord[nodeA.key].title !==
        lastB?.state.treeDataRecord[nodeB.key].title,
    );

    return {
      ...results,
      更新: results.更新?.map((更新操作) => ({
        ...更新操作,
        newRecordItem: lastB?.state.treeDataRecord[更新操作.节点key],
        oldRecordItem: lastA?.state.treeDataRecord[更新操作.节点key],
      })),
    };
  }

  // 同步差异到远程数据库
  private async syncDifferences(
    differences: DiffResult<ProjectStructureTreeDataNode>,
  ): Promise<void> {
    // 实现你的同步逻辑，例如通过 API 请求发送差异数据到远程数据库
    console.log('同步差异:', differences);
    api.syncs.applyProjectDiff();
  }

  // 执行同步操作
  public async sync(): Promise<void> {
    const differences = this.compareHistories();
    await this.syncDifferences(differences);
  }

  // 接受新的历史记录数组，并更新 A 和 B
  public updateHistories(newHistory: 扩展历史记录[]): void {
    this.historyA = this.historyB;
    this.historyB = newHistory;
  }
}
