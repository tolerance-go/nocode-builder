import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OperationType, RecordWithId, Table } from '.';

interface Person extends RecordWithId {
  name: string;
  age: number;
}

describe('Table 类测试', () => {
  let table: Table<Person>;

  beforeEach(() => {
    table = new Table<Person>();
  });

  it('应该增加一条记录', () => {
    table.addRecord({ id: 1, name: 'Alice', age: 30 });
    expect(table.findRecord(1)).toEqual({ id: 1, name: 'Alice', age: 30 });
  });

  it('应该删除一条记录', () => {
    table.addRecord({ id: 1, name: 'Alice', age: 30 });
    table.deleteRecord(1);
    expect(table.findRecord(1)).toBeUndefined();
  });

  it('应该找到一条记录', () => {
    table.addRecord({ id: 1, name: 'Alice', age: 30 });
    const record = table.findRecord(1);
    expect(record).toEqual({ id: 1, name: 'Alice', age: 30 });
  });

  it('应该搜索记录', () => {
    table.addRecord({ id: 1, name: 'Alice', age: 30 });
    table.addRecord({ id: 2, name: 'Bob', age: 25 });
    const records = table.searchRecords((record) => record.age > 25);
    expect(records).toEqual([{ id: 1, name: 'Alice', age: 30 }]);
  });

  it('应该提交一个事务', async () => {
    await table.$transaction(async (tx) => {
      tx.addRecord({ id: 1, name: 'Alice', age: 30 });
      tx.addRecord({ id: 2, name: 'Bob', age: 25 });
    });
    expect(table.findRecord(1)).toEqual({ id: 1, name: 'Alice', age: 30 });
    expect(table.findRecord(2)).toEqual({ id: 2, name: 'Bob', age: 25 });
  });

  it('应该回滚一个事务', async () => {
    try {
      await table.$transaction(async (tx) => {
        tx.addRecord({ id: 1, name: 'Alice', age: 30 });
        tx.addRecord({ id: 2, name: 'Bob', age: 25 });
        throw new Error('事务失败');
      });
    } catch (error) {
      // 事务失败，进行回滚
    }
    expect(table.findRecord(1)).toBeUndefined();
    expect(table.findRecord(2)).toBeUndefined();
  });

  it('应该通过下标查找记录', () => {
    table.addRecord({ id: 1, name: 'Alice', age: 30 });
    table.addRecord({ id: 2, name: 'Bob', age: 25 });
    const record = table.findRecordByIndex(1);
    expect(record).toEqual({ id: 2, name: 'Bob', age: 25 });
  });

  it('应该清空所有记录', () => {
    table.addRecord({ id: 1, name: 'Alice', age: 30 });
    table.addRecord({ id: 2, name: 'Bob', age: 25 });
    table.clearRecords();
    expect(table.findRecord(1)).toBeUndefined();
    expect(table.findRecord(2)).toBeUndefined();
  });

  it('应该获取下一个可用的 ID', () => {
    expect(table.getNextId()).toBe(1);
    table.addRecord({ id: 1, name: 'Alice', age: 30 });
    expect(table.getNextId()).toBe(2);
    table.addRecord({ id: 2, name: 'Bob', age: 25 });
    expect(table.getNextId()).toBe(3);
  });

  it('应该在增加记录时调用监听器', () => {
    const listener = vi.fn();
    const unregister = table.registerListener(listener);

    table.addRecord({ id: 1, name: 'Alice', age: 30 });
    expect(listener).toHaveBeenCalledWith(OperationType.ADD_RECORD, {
      id: 1,
      name: 'Alice',
      age: 30,
    });

    unregister();
  });

  it('应该在删除记录时调用监听器', () => {
    const listener = vi.fn();
    table.addRecord({ id: 1, name: 'Alice', age: 30 });
    const unregister = table.registerListener(listener);

    table.deleteRecord(1);
    expect(listener).toHaveBeenCalledWith(OperationType.DELETE_RECORD, {
      id: 1,
      name: 'Alice',
      age: 30,
    });

    unregister();
  });

  it('应该在更新记录时调用监听器', () => {
    const listener = vi.fn();
    table.addRecord({ id: 1, name: 'Alice', age: 30 });
    const unregister = table.registerListener(listener);

    table.updateRecord({ id: 1, name: 'Alice', age: 31 });
    expect(listener).toHaveBeenCalledWith(OperationType.UPDATE_RECORD, {
      id: 1,
      name: 'Alice',
      age: 31,
    });

    unregister();
  });

  it('应该在清空记录时调用监听器', () => {
    const listener = vi.fn();
    table.addRecord({ id: 1, name: 'Alice', age: 30 });
    const unregister = table.registerListener(listener);

    table.clearRecords();
    expect(listener).toHaveBeenCalledWith(
      OperationType.CLEAR_RECORDS,
      undefined,
    );

    unregister();
  });

  it('应该获取全部记录', () => {
    table.addRecord({ id: 1, name: 'Alice', age: 30 });
    table.addRecord({ id: 2, name: 'Bob', age: 25 });
    const allRecords = table.getAllRecords();
    expect(allRecords).toEqual([
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
    ]);
  });
});
