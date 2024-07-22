import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EngineBase } from '.';
import { EngineManagerBase } from '../EngineManager';
import { ModuleBase } from '../Module';

// 模拟的 PromiseWithResolvers

class TestEngineManager extends EngineManagerBase {}
class TestModule extends ModuleBase {
  async onSetup() {
    // 自定义的 setup 逻辑
  }

  async onStart() {
    // 自定义的 start 逻辑
  }
}

class TestEngine extends EngineBase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAddedToEngineManager(_engineManager: EngineManagerBase) {}

  protected async onLaunch() {
    // 自定义的 launch 逻辑
  }
}

describe('EngineBase', () => {
  let engine: TestEngine;

  beforeEach(() => {
    engine = new TestEngine();
  });

  it('应该正确设置和获取 engineManager 实例', () => {
    const engineManager = new TestEngineManager();
    engine.engineManager = engineManager;
    expect(engine.engineManager).toBe(engineManager);
  });

  it('没有设置 engineManager 时应该抛出错误', () => {
    expect(() => engine.engineManager).toThrow('EngineManager not set');
  });

  it('应该正确添加和获取依赖引擎', () => {
    const dependentEngine = new TestEngine();
    engine['requireEngines'](dependentEngine);
    expect(engine.requiredEngines.has(dependentEngine)).toBe(true);
    expect(dependentEngine.dependentEngines.has(engine)).toBe(true);
  });

  it('应该正确获取指定类型的依赖引擎', () => {
    const dependentEngine = new TestEngine();
    engine['requireEngines'](dependentEngine);
    const fetchedEngine = engine.getDependEngine(TestEngine);
    expect(fetchedEngine).toBe(dependentEngine);
  });

  it('没有找到指定类型的依赖引擎时应该抛出错误', () => {
    expect(() => engine.getDependEngine(TestEngine)).toThrow(
      'Module of type TestEngine not found',
    );
  });

  it('应该正确执行 launch 逻辑', async () => {
    const dependentEngine = new TestEngine();
    engine['requireEngines'](dependentEngine);

    dependentEngine.launchProcessing.resolve();
    await engine.launch();

    expect(engine['hasLaunched']).toBe(true);
  });

  it('重复调用 launch 应该抛出错误', async () => {
    await engine.launch();
    await expect(engine.launch()).rejects.toThrow('Engine already launch');
  });

  it('应该正确添加和获取模块', () => {
    const testModule = new TestModule();
    engine['providerModules'](testModule);
    expect(engine['modules'].has(testModule)).toBe(true);
  });

  it('应该正确获取指定类型的模块', () => {
    const testModule = new TestModule();
    engine['providerModules'](testModule);
    const fetchedModule = engine.getModule(TestModule);
    expect(fetchedModule).toBe(testModule);
  });

  it('没有找到指定类型的模块时应该抛出错误', () => {
    expect(() => engine.getModule(TestModule)).toThrow(
      'Module of type TestModule not found',
    );
  });

  it('应该正确调用 setupModules 和 startModules', async () => {
    const testModule = new TestModule();
    engine['providerModules'](testModule);
    await engine['setupModules']([testModule]);
    await engine['startModules']([testModule]);

    expect(testModule.setupProcessing.promise).resolves.toBeUndefined();
    expect(testModule.startProcessing.promise).resolves.toBeUndefined();
  });

  it('应该在首次设置 engineManager 时调用 onAddedToEngineManager', () => {
    const engineManager = new TestEngineManager();
    const onAddedToEngineManagerSpy = vi.spyOn(
      engine,
      'onAddedToEngineManager',
    );
    engine.engineManager = engineManager;
    expect(onAddedToEngineManagerSpy).toHaveBeenCalledWith(engineManager);
  });

  it('再次设置 engineManager 不应调用 onAddedToEngineManager', () => {
    const engineManager = new TestEngineManager();
    const onAddedToEngineManagerSpy = vi.spyOn(
      engine,
      'onAddedToEngineManager',
    );
    engine.engineManager = engineManager;
    engine.engineManager = engineManager; // 再次设置
    expect(onAddedToEngineManagerSpy).toHaveBeenCalledTimes(1);
  });
});
