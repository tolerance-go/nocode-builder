import { EngineBase } from '@/base';
import { EngineManagerBase } from '@/base/EngineManager';
import { 状态本地持久化内存模型管理模块 } from '@/modules/状态本地持久化内存模型管理模块';
import {
  clearMockLocalforageData,
  mockLocalData,
  mockLocalforage,
} from '@/tests';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

class TestEngineManager extends EngineManagerBase {}
class TestEngine extends EngineBase {}

describe('状态本地持久化内存模型管理模块', () => {
  beforeEach(() => {
    mockLocalforage();
  });

  afterEach(() => {
    vi.clearAllMocks();
    clearMockLocalforageData();
  });

  it('应该正确设置和获取数据', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new 状态本地持久化内存模型管理模块(engine);

    module.set<string>('testKey', 'testValue');
    const value = module.get<string>('testKey');
    expect(value).toBe('testValue');
  });

  it('获取不存在的 key 时应该返回 undefined', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new 状态本地持久化内存模型管理模块(engine);

    const value = module.get<string>('nonExistentKey');
    expect(value).toBeUndefined();
  });

  it('应该正确删除数据', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new 状态本地持久化内存模型管理模块(engine);

    module.set<string>('testKey', 'testValue');
    module.remove('testKey');
    const value = module.get<string>('testKey');
    expect(value).toBeUndefined();
  });

  it('应该正确同步数据到 localforage', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new 状态本地持久化内存模型管理模块(engine);

    module.set<string>('testKey', 'testValue');
    await module['taskQueue'];

    expect(mockLocalData['testKey']).toBe('testValue');
  });

  it('应该正确从 localforage 删除数据', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new 状态本地持久化内存模型管理模块(engine);

    module.set<string>('testKey', 'testValue');
    await module['taskQueue'];

    module.remove('testKey');
    await module['taskQueue'];

    expect(mockLocalData['testKey']).toBeNull();
  });

  it('应该按顺序执行任务队列', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new 状态本地持久化内存模型管理模块(engine);

    module.set<string>('testKey1', 'testValue1');
    module.set<string>('testKey2', 'testValue2');
    module.remove('testKey1');

    await module['taskQueue'];

    expect(mockLocalData['testKey1']).toBeNull();
    expect(mockLocalData['testKey2']).toBe('testValue2');
  });
});
