import { JsonValue } from '@/common/types';
import { OperationType } from '@unocode/common';

export type RecordWithId = {
  id: number;
};

export { OperationType };

type SideEffectListener<T> = (operation: OperationType, record?: T) => void;

export class TxTable<T extends RecordWithId> {
  private baseTable: Table<T>;
  private txRecords: T[];

  constructor(baseTable: Table<T>) {
    this.baseTable = baseTable;
    this.txRecords = [...baseTable.getAllRecords()];
  }

  clearRecords(): void {
    this.txRecords = [];
    this.baseTable.notifyListeners(OperationType.CLEAR_RECORDS);
  }

  addRecord(record: T): void {
    this.txRecords.push(record);
    this.baseTable.notifyListeners(OperationType.ADD_RECORD, record);
  }

  updateRecord(updatedRecord: T): void {
    const index = this.txRecords.findIndex(
      (record) => record.id === updatedRecord.id,
    );
    if (index === -1) {
      throw new Error(`Record with id ${updatedRecord.id} not found`);
    }
    this.txRecords[index] = updatedRecord;
    this.baseTable.notifyListeners(OperationType.UPDATE_RECORD, updatedRecord);
  }

  deleteRecord(id: number): void {
    const record = this.findRecord(id);
    if (record) {
      this.txRecords = this.txRecords.filter((record) => record.id !== id);
      this.baseTable.notifyListeners(OperationType.DELETE_RECORD, record);
    }
  }

  findRecord(id: number): T | undefined {
    return this.txRecords.find((record) => record.id === id);
  }

  findRecordOrThrow(id: number): T {
    const record = this.findRecord(id);
    if (record === undefined) {
      throw new Error(`Record with id ${id} not found`);
    }
    return record;
  }

  searchRecords(predicate: (record: T) => boolean): T[] {
    return this.txRecords.filter(predicate);
  }

  getAllRecords(): T[] {
    return this.txRecords;
  }

  // 获取下一个可用的 ID
  getNextId(): number {
    if (this.txRecords.length === 0) {
      return 1;
    }
    const maxId = this.txRecords.reduce(
      (max, record) => (record.id > max ? record.id : max),
      this.txRecords[0].id,
    );
    return maxId + 1;
  }

  commit(): void {
    this.baseTable.reset(this.txRecords);
  }
}

export class Table<T extends RecordWithId> {
  private records: T[] = [];
  private listeners: SideEffectListener<T>[] = [];
  private isTransactionActive: boolean = false;
  private queue: (() => void)[] = [];

  // 重置记录
  reset(initialRecords: T[] = []): void {
    this.records = initialRecords;
  }

  // 初始化记录
  initializeRecords(initialRecords: T[] = []): void {
    this.records = initialRecords;
  }

  // 清空所有记录
  clearRecords(): void {
    this.enqueue(() => {
      this.records = [];
      this.notifyListeners(OperationType.CLEAR_RECORDS);
    });
  }

  // 增加记录
  addRecord(record: T): void {
    this.enqueue(() => {
      this.records.push(record);
      this.notifyListeners(OperationType.ADD_RECORD, record);
    });
  }

  // 更新记录
  updateRecord(updatedRecord: T): void {
    this.enqueue(() => {
      const index = this.records.findIndex(
        (record) => record.id === updatedRecord.id,
      );
      if (index === -1) {
        throw new Error(`Record with id ${updatedRecord.id} not found`);
      }
      this.records[index] = updatedRecord;
      this.notifyListeners(OperationType.UPDATE_RECORD, updatedRecord);
    });
  }

  // 删除记录
  deleteRecord(id: number): void {
    this.enqueue(() => {
      const record = this.findRecord(id);
      if (record) {
        this.records = this.records.filter((record) => record.id !== id);
        this.notifyListeners(OperationType.DELETE_RECORD, record);
      }
    });
  }

  // 通过下标查找记录
  findRecordByIndex(index: number): T | undefined {
    this.checkTransactionState();
    return this.records[index];
  }

  // 查找记录
  findRecord(id: number): T | undefined {
    this.checkTransactionState();
    return this.records.find((record) => record.id === id);
  }

  findRecordOrThrow(id: number): T {
    this.checkTransactionState();
    const record = this.findRecord(id);
    if (record === undefined) {
      throw new Error(`Record with id ${id} not found`);
    }
    return record;
  }

  // 获取下一个可用的 ID
  getNextId(): number {
    this.checkTransactionState();
    if (this.records.length === 0) {
      return 1;
    }
    const maxId = this.records.reduce(
      (max, record) => (record.id > max ? record.id : max),
      this.records[0].id,
    );
    return maxId + 1;
  }

  // 搜索记录
  searchRecords(predicate: (record: T) => boolean): T[] {
    this.checkTransactionState();
    return this.records.filter(predicate);
  }

  // 获取全部记录
  getAllRecords(): T[] {
    this.checkTransactionState();
    return this.records;
  }

  // 将 records 转换为 JSON 对象
  toTestSnapshot(): { [key: string]: JsonValue }[] {
    this.checkTransactionState();

    // 递归修改对象中的日期属性值为空字符串
    const replaceDatesWithEmptyString = (obj: JsonValue): JsonValue => {
      if (Array.isArray(obj)) {
        return obj.map((item) => replaceDatesWithEmptyString(item));
      } else if (obj !== null && typeof obj === 'object') {
        const newObj: { [key: string]: JsonValue | undefined } = {};
        for (const key in obj) {
          if (key === 'createdAt' || key === 'updatedAt') {
            newObj[key] = '';
          } else {
            newObj[key] =
              obj[key] !== undefined
                ? replaceDatesWithEmptyString(obj[key])
                : obj[key];
          }
        }
        return newObj;
      }
      return obj;
    };

    return replaceDatesWithEmptyString(this.records) as {
      [key: string]: JsonValue;
    }[];
  }

  // 注册监听器
  registerListener(listener: SideEffectListener<T>): () => void {
    this.listeners.push(listener);
    // 返回解除监听的方法
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // 事务接口
  async $transaction(
    fn: (tableTx: TxTable<T>) => Promise<void> | void,
  ): Promise<void> {
    if (this.isTransactionActive) {
      throw new Error('已有进行中的事务');
    }

    const txTable = new TxTable(this);

    try {
      this.startTransaction();
      await fn(txTable);
      this.commitTransaction(txTable);
    } catch (error) {
      this.rollbackTransaction();
      throw error;
    } finally {
      this.processQueue();
    }
  }

  // 通知监听器
  public notifyListeners(operation: OperationType, record?: T): void {
    this.listeners.forEach((listener) => listener(operation, record));
  }

  // 开始事务
  private startTransaction(): void {
    if (this.isTransactionActive) {
      throw new Error('事务已经开始');
    }
    this.isTransactionActive = true;
  }

  // 提交事务
  private commitTransaction(tableTx: TxTable<T>): void {
    if (!this.isTransactionActive) {
      throw new Error('没有进行中的事务');
    }
    tableTx.commit();
    this.isTransactionActive = false;
  }

  // 回滚事务
  private rollbackTransaction(): void {
    if (!this.isTransactionActive) {
      throw new Error('没有进行中的事务');
    }
    this.isTransactionActive = false;
  }

  // 将操作加入队列
  private enqueue(action: () => void): void {
    if (this.isTransactionActive) {
      this.queue.push(action);
    } else {
      action();
    }
  }

  // 处理队列中的操作
  private processQueue(): void {
    while (this.queue.length > 0) {
      const action = this.queue.shift();
      if (action) action();
    }
  }

  private checkTransactionState(): void {
    if (this.isTransactionActive) {
      throw new Error('当前正在进行事务，无法查询记录');
    }
  }
}
