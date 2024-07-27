export type RecordWithId = {
  id: number;
};

export class Table<T extends RecordWithId> {
  private records: T[] = [];
  private transactionRecords: T[] | null = null;

  // 增加记录
  addRecord(record: T): void {
    this.records.push(record);
  }
  // 删除记录
  deleteRecord(id: number): void {
    this.records = this.records.filter((record) => record.id !== id);
  }
  // 查找记录
  findRecord(id: number): T | undefined {
    return this.records.find((record) => record.id === id);
  }
  // 搜索记录
  searchRecords(predicate: (record: T) => boolean): T[] {
    return this.records.filter(predicate);
  }
  // 事务接口
  async $transaction(fn: (table: this) => Promise<void> | void): Promise<void> {
    this.startTransaction();
    try {
      await fn(this);
      this.commitTransaction();
    } catch (error) {
      this.rollbackTransaction();
      throw error;
    }
  }
  // 开始事务
  private startTransaction(): void {
    if (this.transactionRecords !== null) {
      throw new Error('事务已经开始');
    }
    this.transactionRecords = [...this.records];
  }

  // 提交事务
  private commitTransaction(): void {
    if (this.transactionRecords === null) {
      throw new Error('没有进行中的事务');
    }
    this.transactionRecords = null;
  }

  // 回滚事务
  private rollbackTransaction(): void {
    if (this.transactionRecords === null) {
      throw new Error('没有进行中的事务');
    }
    this.records = this.transactionRecords;
    this.transactionRecords = null;
  }
}
