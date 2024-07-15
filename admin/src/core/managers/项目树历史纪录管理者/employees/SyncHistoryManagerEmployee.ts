import { api } from '@/globals';
import {
  compareTrees,
  DiffResult,
  ProjectStructureTreeDataNode,
} from '../../UIStoreManager';
import { 历史记录 } from '../machines';

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
    const results = compareTrees(
      this.historyA.length
        ? this.historyA[this.historyA.length - 1].state.treeNodes
        : [],
      this.historyB.length
        ? this.historyB[this.historyB.length - 1].state.treeNodes
        : [],
      (nodeA, nodeB) => nodeA.title !== nodeB.title,
    );

    return results;
  }

  // 同步差异到远程数据库
  private async syncDifferences(
    differences: DiffResult<ProjectStructureTreeDataNode>,
  ): Promise<void> {
    // 实现你的同步逻辑，例如通过 API 请求发送差异数据到远程数据库
    console.log('同步差异:', differences);
    const requests: ((...args: unknown[]) => Promise<void>)[] = [];
    if (differences.新增) {
      differences.新增.forEach((item) => {
        requests.push(async () => {
          api.projects.createProject;
        });
      });
    }
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
