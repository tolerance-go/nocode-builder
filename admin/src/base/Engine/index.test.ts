import { describe, expect, it } from 'vitest';
import { EngineBase } from '.';
import { EngineManagerBase } from '../EngineManager';
import { ModuleBase } from '../Module';

class TestEngineManager extends EngineManagerBase {}
class TestModule extends ModuleBase {}
class TestEngine extends EngineBase {}

describe('EngineBase', () => {
  it('应该正确设置和获取 engineManager 实例', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    expect(engine.engineManager).toBe(engineManager);
  });

  it('应该正确添加和获取依赖引擎', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const dependentEngine = new TestEngine(engineManager);
    engine['requireEngines'](dependentEngine);
    expect(engine.requiredEngines.has(dependentEngine)).toBe(true);
  });

  it('应该正确获取指定类型的依赖引擎', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const dependentEngine = new TestEngine(engineManager);
    engine['requireEngines'](dependentEngine);
    const fetchedEngine = engine.getDependEngine(TestEngine);
    expect(fetchedEngine).toBe(dependentEngine);
  });

  it('没有找到指定类型的依赖引擎时应该抛出错误', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    expect(() => engine.getDependEngine(TestEngine)).toThrow(
      'Module of type TestEngine not found',
    );
  });

  it('应该正确执行 launch 逻辑', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const dependentEngine = new TestEngine(engineManager);
    engine['requireEngines'](dependentEngine);

    dependentEngine.launchProcessing.resolve();
    await engine.launch();

    expect(engine['hasLaunched']).toBe(true);
  });

  it('重复调用 launch 应该抛出错误', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    await engine.launch();
    await expect(engine.launch()).rejects.toThrow('Engine already launch');
  });

  it('应该正确添加和获取模块', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const testModule = new TestModule(engine);
    engine['providerModules'](testModule);
    expect(engine['providedModules'].has(testModule)).toBe(true);
  });

  it('应该正确获取指定类型的模块', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const testModule = new TestModule(engine);
    engine['providerModules'](testModule);
    const fetchedModule = engine.getModule(TestModule);
    expect(fetchedModule).toBe(testModule);
  });

  it('没有找到指定类型的模块时应该抛出错误', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    expect(() => engine.getModule(TestModule)).toThrow(
      'Module of type TestModule not found',
    );
  });

  it('应该正确调用 setupModules 和 startModules', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const testModule = new TestModule(engine);
    engine['providerModules'](testModule);
    await engine['setupModules']([testModule]);
    await engine['startModules']([testModule]);

    expect(testModule.setupProcessing.promise).resolves.toBeUndefined();
    expect(testModule.startProcessing.promise).resolves.toBeUndefined();
  });

  it('应该正确获取指定类型的所有依赖引擎', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const dependentEngine1 = new TestEngine(engineManager);
    const dependentEngine2 = new TestEngine(engineManager);
    engine['requireEngines'](dependentEngine1, dependentEngine2);

    const fetchedEngines = engine.getDependEngines(TestEngine);
    expect(fetchedEngines.length).toBe(2);
    expect(fetchedEngines).toContain(dependentEngine1);
    expect(fetchedEngines).toContain(dependentEngine2);
  });

  it('应该在 providerModules 中正确处理所有依赖模块', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const testModule = new TestModule(engine);
    const dependentModule = new TestModule(engine);

    testModule['requireModules'](dependentModule);

    engine['providerModules'](testModule);

    expect(engine['providedModules'].has(testModule)).toBe(true);
    expect(engine['providedModules'].has(dependentModule)).toBe(false);
    expect(engine['allModules'].has(testModule)).toBe(true);
    expect(engine['allModules'].has(dependentModule)).toBe(true);
  });

  it('应该正确处理具有多层依赖的模块', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const testModule = new TestModule(engine);
    const dependentModule = new TestModule(engine);
    const subDependentModule = new TestModule(engine);

    testModule['requireModules'](dependentModule);
    dependentModule['requireModules'](subDependentModule);

    engine['providerModules'](testModule);

    expect(engine['providedModules'].has(testModule)).toBe(true);
    expect(engine['providedModules'].has(dependentModule)).toBe(false);
    expect(engine['providedModules'].has(subDependentModule)).toBe(false);
    expect(engine['allModules'].has(testModule)).toBe(true);
    expect(engine['allModules'].has(dependentModule)).toBe(true);
    expect(engine['allModules'].has(subDependentModule)).toBe(true);
  });

  it('toJSON', async () => {
    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestEngine(this));
      }
    }
    class TestEngine extends EngineBase {}
    const engineManager = new TestEngineManager();

    await engineManager.launch();

    const engine = engineManager.getEngine(TestEngine);

    expect(JSON.stringify(engine)).toMatchInlineSnapshot(
      `"{"name":"TestEngine2"}"`,
    );
  });
});
