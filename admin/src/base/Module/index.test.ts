import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ModuleBase } from '.';
import { EngineBase } from '../Engine';

class TestEngine extends EngineBase {}
class TestModule extends ModuleBase {
  async onSetup() {
    // 自定义的 setup 逻辑
  }

  async onStart() {
    // 自定义的 start 逻辑
  }

  onAddedToEngine() {}
}

describe('ModuleBase', () => {
  let module: TestModule;

  beforeEach(() => {
    module = new TestModule();
  });

  it('应该正确设置和获取 engine 实例', () => {
    const engine = new TestEngine();
    module.engine = engine;
    expect(module.engine).toBe(engine);
  });

  it('没有设置 engine 时应该抛出错误', () => {
    expect(() => module.engine).toThrow('Engine not set');
  });

  it('应该正确添加和获取依赖模块', () => {
    const dependentModule = new TestModule();
    module['requireModules'](dependentModule);
    expect(module.requiredModules.has(dependentModule)).toBe(true);
    expect(dependentModule.dependentModules.has(module)).toBe(true);
  });

  it('应该正确获取指定类型的依赖模块', () => {
    const dependentModule = new TestModule();
    module['requireModules'](dependentModule);
    const fetchedModule = module.getDependModule(TestModule);
    expect(fetchedModule).toBe(dependentModule);
  });

  it('没有找到指定类型的依赖模块时应该抛出错误', () => {
    expect(() => module.getDependModule(TestModule)).toThrow(
      'Module of type TestModule not found',
    );
  });

  it('应该正确执行 setup 逻辑', async () => {
    const dependentModule = new TestModule();
    module['requireModules'](dependentModule);

    dependentModule.setupProcessing.resolve();
    await module.setup();

    expect(module['hasSetup']).toBe(true);
  });

  it('重复调用 setup 应该抛出错误', async () => {
    await module.setup();
    await expect(module.setup()).rejects.toThrow('Module already setup');
  });

  it('应该正确执行 start 逻辑', async () => {
    const dependentModule = new TestModule();
    module['requireModules'](dependentModule);

    dependentModule.setupProcessing.resolve();
    await module.setup();

    dependentModule.startProcessing.resolve();
    await module.start();

    expect(module['hasStarted']).toBe(true);
  });

  it('重复调用 start 应该抛出错误', async () => {
    const dependentModule = new TestModule();
    module['requireModules'](dependentModule);

    dependentModule.setupProcessing.resolve();
    await module.setup();

    dependentModule.startProcessing.resolve();
    await module.start();

    await expect(module.start()).rejects.toThrow('Module already started');
  });

  it('应该在首次设置 engine 时调用 onAddedToEngine', () => {
    const engine = new TestEngine();
    const onAddedToEngineSpy = vi.spyOn(module, 'onAddedToEngine');
    module.engine = engine;
    expect(onAddedToEngineSpy).toHaveBeenCalledWith(engine);
  });

  it('再次设置 engine 不应调用 onAddedToEngine', () => {
    const engine = new TestEngine();
    const onAddedToEngineSpy = vi.spyOn(module, 'onAddedToEngine');
    module.engine = engine;
    module.engine = engine; // 再次设置
    expect(onAddedToEngineSpy).toHaveBeenCalledTimes(1);
  });
});
