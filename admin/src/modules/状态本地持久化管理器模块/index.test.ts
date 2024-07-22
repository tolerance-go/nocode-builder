import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import localforage from 'localforage';
import { EngineBase } from '@/base';
import { 状态本地持久化管理器模块 } from '.';

class TestEngine extends EngineBase {
  constructor() {
    super();
    this.providerModules(new 状态本地持久化管理器模块());
  }
}

describe('状态本地持久化管理器模块', () => {
  let engine: TestEngine;
  let module: 状态本地持久化管理器模块;
  const key = '测试键';
  let localData: Record<string, unknown | null> = {};

  beforeEach(async () => {
    engine = new TestEngine();
    module = engine.getModule(状态本地持久化管理器模块);
    await engine.launch();
    vi.spyOn(localforage, 'setItem').mockImplementation(async (k, newData) => {
      localData[k] = newData;
    });
    vi.spyOn(localforage, 'getItem').mockImplementation(async (k) => {
      return localData[k] || null;
    });
    vi.spyOn(localforage, 'removeItem').mockImplementation(async (k) => {
      localData[k] = null;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localData = {}; // 重置 localData
  });

  it('应该持久化数据', async () => {
    const data = { 测试: '值' };
    await module.persistData(key, data);
    const savedData = await localforage.getItem(key);
    expect(savedData).toEqual(data);
  });

  it('应该获取数据', async () => {
    const data = { 测试: '值' };
    localData[key] = data;
    const result = await module.getData<typeof data>(key);
    expect(result).toEqual(data);
  });

  it('应该删除数据', async () => {
    const data = { 测试: '值' };
    localData[key] = data;
    await module.removeData(key);
    const removedData = await localforage.getItem(key);
    expect(removedData).toBeNull();
  });

  it('应该处理任务成功', async () => {
    const data = { 测试: '值' };
    await module.persistData(key, data);
    // 根据需要检查任务队列的状态或结果
  });

  it('应该处理任务失败', async () => {
    const data = { 测试: '值' };
    vi.spyOn(localforage, 'setItem').mockRejectedValueOnce(new Error('错误'));
    try {
      await module.persistData(key, data);
    } catch (error) {
      // 确认任务失败后的处理逻辑
    }
  });
});
