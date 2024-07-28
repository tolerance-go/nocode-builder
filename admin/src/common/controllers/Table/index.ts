import { JSONValue } from '@/common/types';

export type RecordWithId = {
  id: number;
};

export enum OperationType {
  CLEAR_RECORDS = 'clearRecords',
  ADD_RECORD = 'addRecord',
  UPDATE_RECORD = 'updateRecord',
  DELETE_RECORD = 'deleteRecord',
}

type SideEffectListener<T> = (operation: OperationType, record?: T) => void;

export class Table<T extends RecordWithId> {
  private records: T[] = [];
  private transactionRecords: T[] | null = null;
  private listeners: SideEffectListener<T>[] = [];

  // 清空所有记录
  clearRecords(): void {
    this.records = [];
    this.notifyListeners(OperationType.CLEAR_RECORDS);
  }

  // 增加记录
  addRecord(record: T): void {
    this.records.push(record);
    this.notifyListeners(OperationType.ADD_RECORD, record);
  }

  // 更新记录
  updateRecord(updatedRecord: T): void {
    const index = this.records.findIndex(
      (record) => record.id === updatedRecord.id,
    );
    if (index === -1) {
      throw new Error(`Record with id ${updatedRecord.id} not found`);
    }
    this.records[index] = updatedRecord;
    this.notifyListeners(OperationType.UPDATE_RECORD, updatedRecord);
  }

  // 删除记录
  deleteRecord(id: number): void {
    const record = this.findRecord(id);
    if (record) {
      this.records = this.records.filter((record) => record.id !== id);
      this.notifyListeners(OperationType.DELETE_RECORD, record);
    }
  }

  // 通过下标查找记录
  findRecordByIndex(index: number): T | undefined {
    return this.records[index];
  }

  // 查找记录
  findRecord(id: number): T | undefined {
    return this.records.find((record) => record.id === id);
  }

  findRecordOrThrow(id: number): T {
    const record = this.findRecord(id);
    if (record === undefined) {
      throw new Error(`Record with id ${id} not found`);
    }
    return record;
  }

  // 获取下一个可用的 ID
  getNextId(): number {
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
    return this.records.filter(predicate);
  }

  // 将 records 转换为 JSON 对象
  toTestSnapshot(): { [key: string]: JSONValue }[] {
    // 递归修改对象中的日期属性值为空字符串
    const replaceDatesWithEmptyString = (obj: JSONValue): JSONValue => {
      if (Array.isArray(obj)) {
        return obj.map((item) => replaceDatesWithEmptyString(item));
      } else if (obj !== null && typeof obj === 'object') {
        const newObj: { [key: string]: JSONValue } = {};
        for (const key in obj) {
          if (key === 'createdAt' || key === 'updatedAt') {
            newObj[key] = '';
          } else {
            newObj[key] = replaceDatesWithEmptyString(obj[key]);
          }
        }
        return newObj;
      }
      return obj;
    };

    return replaceDatesWithEmptyString(this.records) as {
      [key: string]: JSONValue;
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

  // 通知监听器
  private notifyListeners(operation: OperationType, record?: T): void {
    this.listeners.forEach((listener) => listener(operation, record));
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
