import { api } from '@/globals';
import { last } from 'lodash-es';
import {
  compareTrees,
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '../../UIStoreManager';
import { 历史记录 } from '../machines';
import { convertDiffResultToProjectDiffDto } from './utils';

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
    await api.syncs.applyProjectDiff(
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
