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
  private compareHistories(): unknown {
    // 实现你的差异比较逻辑，返回差异数据
    // 这里仅作为占位，具体实现根据你的业务逻辑来完成
    return {};
  }

  // 同步差异到远程数据库
  private async syncDifferences(differences: unknown): Promise<void> {
    // 实现你的同步逻辑，例如通过 API 请求发送差异数据到远程数据库
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
