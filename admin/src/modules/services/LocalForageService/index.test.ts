import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { EngineBase } from '@/base';
import localforage from 'localforage';
import { LocalForageService } from '.';
import { EngineManagerBase } from '@/base/EngineManager';

describe('LocalForageService', () => {
  let localForageService: LocalForageService;
  let mockLocalForageInstance: {
    setItem: Mock;
    getItem: Mock;
    removeItem: Mock;
    clear: Mock;
    iterate: Mock;
  };

  beforeEach(async () => {
    // Mock localforage methods and instance
    mockLocalForageInstance = {
      setItem: vi.fn(),
      getItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      iterate: vi.fn(),
    };

    vi.spyOn(localforage, 'createInstance').mockReturnValue(
      mockLocalForageInstance as unknown as LocalForage,
    );

    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestEngine(this));
      }
    }
    class TestEngine extends EngineBase {
      protected providerModules(): void {
        super.providerModules(new LocalForageService(this));
      }
    }

    const engineManager = new TestEngineManager();

    await engineManager.launch();

    localForageService = engineManager
      .getEngine(TestEngine)
      .getModule(LocalForageService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确设置项目', async () => {
    const key = 'testKey';
    const value = 'testValue';

    await localForageService.setItem(key, value);

    expect(mockLocalForageInstance.setItem).toHaveBeenCalledWith(key, value);
  });

  it('应该正确获取项目', async () => {
    const key = 'testKey';
    const value = 'testValue';
    (mockLocalForageInstance.getItem as Mock).mockResolvedValue(value);

    const result = await localForageService.getItem<string>(key);

    expect(result).toBe(value);
    expect(mockLocalForageInstance.getItem).toHaveBeenCalledWith(key);
  });

  it('获取不存在的项目时应该返回 null', async () => {
    const key = 'nonExistentKey';
    (mockLocalForageInstance.getItem as Mock).mockResolvedValue(null);

    const result = await localForageService.getItem<string>(key);

    expect(result).toBeNull();
    expect(mockLocalForageInstance.getItem).toHaveBeenCalledWith(key);
  });

  it('应该正确删除项目', async () => {
    const key = 'testKey';

    await localForageService.removeItem(key);

    expect(mockLocalForageInstance.removeItem).toHaveBeenCalledWith(key);
  });

  it('应该正确清除所有项目', async () => {
    await localForageService.clear();

    expect(mockLocalForageInstance.clear).toHaveBeenCalled();
  });

  it('应该正确加载所有项目', async () => {
    const mockData = {
      testKey1: 'testValue1',
      testKey2: 'testValue2',
    };
    mockLocalForageInstance.iterate.mockImplementation((callback) => {
      Object.entries(mockData).forEach(([key, value]) => callback(value, key));
    });

    const result = await localForageService.loadAllItems();

    expect(result).toEqual(mockData);
    expect(mockLocalForageInstance.iterate).toHaveBeenCalled();
  });
});
