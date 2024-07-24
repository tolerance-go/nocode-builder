import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { EngineBase } from '@/base';
import { EngineManagerBase } from '@/base/EngineManager';
import { 状态本地持久化内存模型管理模块 } from '@/modules/状态本地持久化内存模型管理模块';
import { LocalForageService } from '../services/LocalForageService';

describe('状态本地持久化内存模型管理模块', () => {
  let module: 状态本地持久化内存模型管理模块;
  let mockLocalForageService: LocalForageService;

  beforeEach(async () => {
    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestEngine(this));
      }
    }
    class TestEngine extends EngineBase {
      protected providerModules(): void {
        const module = new 状态本地持久化内存模型管理模块(this);
        mockLocalForageService = module.getDependModule(LocalForageService);

        vi.spyOn(mockLocalForageService, 'loadAllItems').mockResolvedValue({
          testKey1: 'testValue1',
          testKey2: 'testValue2',
        });

        super.providerModules(module);
      }
    }
    const engineManager = new TestEngineManager();

    await engineManager.launch();

    module = engineManager
      .getEngine(TestEngine)
      .getModule(状态本地持久化内存模型管理模块);

    // Mock localforage methods
    vi.spyOn(mockLocalForageService, 'setItem').mockResolvedValue(undefined);
    vi.spyOn(mockLocalForageService, 'removeItem').mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确设置和获取数据', () => {
    module.set<string>('testKey', 'testValue');
    const value = module.get<string>('testKey');
    expect(value).toBe('testValue');
  });

  it('获取不存在的 key 时应该返回 undefined', () => {
    const value = module.get<string>('nonExistentKey');
    expect(value).toBeUndefined();
  });

  it('应该正确删除数据', () => {
    module.set<string>('testKey', 'testValue');
    module.remove('testKey');
    const value = module.get<string>('testKey');
    expect(value).toBeUndefined();
  });

  it('应该正确同步数据到 localforage', async () => {
    module.set<string>('testKey', 'testValue');
    await module['taskQueue'];

    expect(mockLocalForageService.setItem).toHaveBeenCalledWith(
      'testKey',
      'testValue',
    );
  });

  it('应该正确从 localforage 删除数据', async () => {
    module.set<string>('testKey', 'testValue');
    await module['taskQueue'];

    module.remove('testKey');
    await module['taskQueue'];

    expect(mockLocalForageService.removeItem).toHaveBeenCalledWith('testKey');
  });

  it('应该按顺序执行任务队列', async () => {
    module.set<string>('testKey1', 'testValue1');
    module.set<string>('testKey2', 'testValue2');
    module.remove('testKey1');

    await module['taskQueue'];

    expect(mockLocalForageService.setItem).toHaveBeenCalledWith(
      'testKey1',
      'testValue1',
    );
    expect(mockLocalForageService.setItem).toHaveBeenCalledWith(
      'testKey2',
      'testValue2',
    );
    expect(mockLocalForageService.removeItem).toHaveBeenCalledWith('testKey1');
  });

  it('onSetup 方法应该正确加载所有数据', async () => {
    expect(module.get<string>('testKey1')).toBe('testValue1');
    expect(module.get<string>('testKey2')).toBe('testValue2');
  });
});
