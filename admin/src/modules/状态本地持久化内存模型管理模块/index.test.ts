import { EngineBase } from '@/base';
import { EngineManagerBase } from '@/base/EngineManager';
import { 状态本地持久化内存模型管理模块 } from '@/modules/状态本地持久化内存模型管理模块';
import { describe, expect, it, vi } from 'vitest';

class TestEngineManager extends EngineManagerBase {}
class TestEngine extends EngineBase {}

describe('状态本地持久化内存模型管理模块', () => {
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
});
