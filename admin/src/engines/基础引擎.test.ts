import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 状态本地持久化内存模型管理模块 } from '@/modules/状态本地持久化内存模型管理模块';
import { EngineManagerBase } from '@/base/EngineManager';
import { LocalForageService } from '@/modules/services/LocalForageService';
import { 基础引擎 } from './基础引擎';

describe('基础引擎', () => {
  let engine: 基础引擎;
  let mockLocalForageService: LocalForageService;
  let mockPersistenceModule: 状态本地持久化内存模型管理模块;

  beforeEach(async () => {
    class TestEngineManager extends EngineManagerBase {}
    class TestEngine extends 基础引擎 {
      protected providerModules(): void {
        super.providerModules();

        mockPersistenceModule = this.getModule(状态本地持久化内存模型管理模块);
        mockLocalForageService =
          mockPersistenceModule.getDependModule(LocalForageService);

        vi.spyOn(mockLocalForageService, 'loadAllItems').mockResolvedValue({
          testKey1: 'testValue1',
          testKey2: 'testValue2',
        });
      }
    }

    const engineManager = new TestEngineManager((self) => new TestEngine(self));
    await engineManager.launch();

    engine = engineManager.getEngine(TestEngine);

    vi.spyOn(mockLocalForageService, 'setItem').mockResolvedValue(undefined);
    vi.spyOn(mockLocalForageService, 'getItem').mockResolvedValue(null);
    vi.spyOn(mockLocalForageService, 'removeItem').mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确设置和获取数据', () => {
    engine.setLocalItem<string>('testKey', 'testValue');
    const value = engine.getLocalItem<string>('testKey');
    expect(value).toBe('testValue');
  });

  it('获取不存在的 key 时应该返回 undefined', () => {
    const value = engine.getLocalItem<string>('nonExistentKey');
    expect(value).toBeUndefined();
  });

  it('应该正确删除数据', () => {
    engine.setLocalItem<string>('testKey', 'testValue');
    engine.removeLocalItem('testKey');
    const value = engine.getLocalItem<string>('testKey');
    expect(value).toBeUndefined();
  });

  it('应该正确同步数据到 localforage', async () => {
    engine.setLocalItem<string>('testKey', 'testValue');
    await mockPersistenceModule['taskQueue'];

    expect(mockLocalForageService.setItem).toHaveBeenCalledWith(
      'testKey',
      'testValue',
    );
  });

  it('应该正确从 localforage 删除数据', async () => {
    engine.setLocalItem<string>('testKey', 'testValue');
    await mockPersistenceModule['taskQueue'];

    engine.removeLocalItem('testKey');
    await mockPersistenceModule['taskQueue'];

    expect(mockLocalForageService.removeItem).toHaveBeenCalledWith('testKey');
  });

  it('应该按顺序执行任务队列', async () => {
    engine.setLocalItem<string>('testKey1', 'testValue1');
    engine.setLocalItem<string>('testKey2', 'testValue2');
    engine.removeLocalItem('testKey1');

    await mockPersistenceModule['taskQueue'];

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
    expect(engine.getLocalItem<string>('testKey1')).toBe('testValue1');
    expect(engine.getLocalItem<string>('testKey2')).toBe('testValue2');
  });
});
