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

export class SyncHistoryManagerEmployee {
  private historyA: 历史记录[] = [];
  private historyB: 历史记录[] = [];
  private pendingUpdate: 历史记录[] | null = null; // 待更新的历史记录数组
  private syncStatus: '未同步' | '已同步' | '同步失败' | '同步中' = '未同步'; // 同步状态属性
  private retryCount: number = 0; // 重试计数
  private readonly maxRetries: number = 3; // 最大重试次数

  constructor(initialHistoryA: 历史记录[], initialHistoryB: 历史记录[]) {
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
  private async sync(): Promise<void> {
    const results = this.compareHistories();
    this.setSyncStatus('同步中');
    try {
      await this.syncDifferences(
        results.diffResults,
        results.oldTreeDataRecord,
        results.newTreeDataRecord,
      );
      this.setSyncStatus('已同步');
      this.retryCount = 0; // 重置重试计数
      this.commitPendingUpdate();
    } catch (error) {
      this.setSyncStatus('同步失败');
      this.handleSyncError();
    }
  }

  // 更新同步状态
  private setSyncStatus(
    status: '未同步' | '已同步' | '同步失败' | '同步中',
  ): void {
    this.syncStatus = status;
  }

  // 提交待更新的历史记录
  private commitPendingUpdate(): void {
    if (this.pendingUpdate) {
      this.historyA = this.historyB;
      this.historyB = this.pendingUpdate;
      this.pendingUpdate = null;
      this.startSync();
    } else {
      this.historyA = this.historyB;
    }
  }

  private handleSyncError() {
    if (this.pendingUpdate) {
      this.historyB = this.pendingUpdate;
      this.pendingUpdate = null;
    }
    this.retrySync();
  }

  private startSync() {
    if (this.syncStatus !== '同步中') {
      this.sync();
    }
  }

  private retrySync() {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.startSync();
    } else {
      throw new Error(`同步失败超过最大重试次数：${this.maxRetries}`);
    }
  }

  // 接受新的历史记录数组，并更新 A 和 B
  public updateHistories(newHistory: 历史记录[]): void {
    if (this.syncStatus === '同步中') {
      this.pendingUpdate = newHistory;
    } else {
      this.historyA = this.historyB;
      this.historyB = newHistory;
      this.startSync();
    }
  }
}
