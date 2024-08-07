import { describe, expect, it } from 'vitest';
import { ModuleBase } from '.';
import { EngineBase } from '../Engine';
import { EngineManagerBase } from '../EngineManager';

class TestEngineManager extends EngineManagerBase {}
class TestEngine extends EngineBase {}
class TestModule extends ModuleBase {}

describe('ModuleBase', () => {
  it('应该正确设置和获取 engine 实例', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new TestModule(engine);

    expect(module.engine).toBe(engine);
  });

  it('应该正确添加和获取依赖模块', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new TestModule(engine);
    const dependentModule = new TestModule(engine);

    module['requireModules'](dependentModule);
    expect(module.requiredModules.has(dependentModule)).toBe(true);
  });

  it('应该正确获取指定类型的依赖模块', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new TestModule(engine);
    const dependentModule = new TestModule(engine);

    module['requireModules'](dependentModule);
    const fetchedModule = module.getDependModule(TestModule);
    expect(fetchedModule).toBe(dependentModule);
  });

  it('没有找到指定类型的依赖模块时应该抛出错误', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new TestModule(engine);

    expect(() => module.getDependModule(TestModule)).toThrow(
      'Module of type TestModule not found',
    );
  });

  it('应该正确执行 setup 逻辑', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new TestModule(engine);
    const dependentModule = new TestModule(engine);

    module['requireModules'](dependentModule);
    dependentModule.setupProcessing.resolve();
    await module.setup();

    expect(module['hasSetup']).toBe(true);
  });

  it('重复调用 setup 应该抛出错误', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new TestModule(engine);

    await module.setup();
    await expect(module.setup()).rejects.toThrow('Module already setup');
  });

  it('应该正确执行 start 逻辑', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new TestModule(engine);
    const dependentModule = new TestModule(engine);

    module['requireModules'](dependentModule);
    dependentModule.setupProcessing.resolve();
    await module.setup();
    dependentModule.startProcessing.resolve();
    await module.start();

    expect(module['hasStarted']).toBe(true);
  });

  it('重复调用 start 应该抛出错误', async () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new TestModule(engine);
    const dependentModule = new TestModule(engine);

    module['requireModules'](dependentModule);
    dependentModule.setupProcessing.resolve();
    await module.setup();
    dependentModule.startProcessing.resolve();
    await module.start();

    await expect(module.start()).rejects.toThrow('Module already started');
  });

  it('应该正确获取指定类型的所有依赖模块', () => {
    const engineManager = new TestEngineManager();
    const engine = new TestEngine(engineManager);
    const module = new TestModule(engine);
    const dependentModule1 = new TestModule(engine);
    const dependentModule2 = new TestModule(engine);
    const otherModule = new (class extends ModuleBase {
      async onSetup() {}
      async onStart() {}
    })(engine);

    module['requireModules'](dependentModule1, dependentModule2, otherModule);

    const fetchedModules = module.getDependModules(TestModule);
    expect(fetchedModules).toEqual([dependentModule1, dependentModule2]);
  });

  it('toJSON', async () => {
    class TestEngine extends EngineBase {
      protected providerModules(): void {
        super.providerModules(new TestModule(this));
      }
    }
    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestEngine(this));
      }
    }

    const engineManager = new TestEngineManager();

    await engineManager.launch();

    const engine = engineManager.getEngine(TestEngine);
    const module = engine.getModule(TestModule);

    expect(JSON.stringify(module)).toMatchInlineSnapshot(
      `"{"name":"TestModule"}"`,
    );
  });

  it('应该正确处理 invokeRequiredModules 选项', async () => {
    class TestModule1 extends ModuleBase {
      constructor(engine: EngineBase) {
        super(engine, { invokeRequiredModules: false });
      }
      protected requireModules(): void {
        super.requireModules(new TestModule2(this.engine));
      }
    }
    class TestModule2 extends ModuleBase {}
    class TestEngine extends EngineBase {
      protected providerModules(): void {
        super.providerModules(new TestModule1(this));
      }
    }

    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestEngine(this));
      }
    }

    const engineManager = new TestEngineManager();

    await engineManager.launch();

    expect(() =>
      engineManager.getEngine(TestEngine).getModule(TestModule2),
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: Module of type TestModule2 not found]`,
    );
  });
});
