import { describe, expect, it } from 'vitest';
import { EngineManagerBase } from '.';
import { EngineBase } from '../Engine';
import { ModuleBase } from '../Module';
import { topologicalSort } from '../utils';

class TestEngine extends EngineBase {}

describe('EngineManagerBase', () => {
  it('应该正确初始化引擎并收集依赖关系', () => {
    const engineManager = new EngineManagerBase(
      (self) => new TestEngine(self),
      (self) => new TestEngine(self),
    );

    const [engineA, engineB] = Array.from(
      engineManager['providedEngines'],
    ) as TestEngine[];

    expect(engineA.engineManager).toBe(engineManager);
    expect(engineB.engineManager).toBe(engineManager);
    expect(engineManager['providedEngines'].has(engineA)).toBe(true);
    expect(engineManager['providedEngines'].has(engineB)).toBe(true);
  });

  it('应该正确启动所有引擎', async () => {
    const engineManager = new EngineManagerBase(
      (self) => new TestEngine(self),
      (self) => new TestEngine(self),
    );

    const [engineA, engineB] = Array.from(
      engineManager['providedEngines'],
    ) as TestEngine[];

    await engineManager.launch();
    expect(engineA['hasLaunched']).toBe(true);
    expect(engineB['hasLaunched']).toBe(true);
  });

  it('应该按拓扑排序启动引擎', async () => {
    const engineManager = new EngineManagerBase(
      (self) => new TestEngine(self),
      (self) => new TestEngine(self),
    );

    const sortedEngines = topologicalSort(
      engineManager['providedEngines'],
      (engine) => engine.requiredEngines,
    );

    await engineManager.launch();
    expect(sortedEngines).toEqual(Array.from(engineManager['allEngines']));
  });

  it('应该正确获取指定类型的引擎', () => {
    const engineManager = new EngineManagerBase(
      (self) => new TestEngine(self),
      (self) => new TestEngine(self),
    );

    const [engineA] = Array.from(
      engineManager['providedEngines'],
    ) as TestEngine[];

    const fetchedEngine = engineManager.getEngine(TestEngine);
    expect(fetchedEngine).toBe(engineA);
  });

  it('没有找到指定类型的引擎时应该抛出错误', () => {
    class NonExistentEngine extends TestEngine {}
    const engineManager = new EngineManagerBase(
      (self) => new TestEngine(self),
      (self) => new TestEngine(self),
    );

    expect(() => engineManager.getEngine(NonExistentEngine)).toThrow(
      'Engine of type NonExistentEngine not found',
    );
  });

  it('应该处理引擎之间的依赖关系', async () => {
    let engineA: TestEngine, engineB: TestEngine;
    const engineManager = new EngineManagerBase((self) => {
      engineA = new TestEngine(self);
      engineB = new TestEngine(self);
      engineA['requireEngines'](engineB);
      return engineA;
    });

    expect(engineB!.dependentEngines.has(engineA!)).toBe(true);
    expect(engineA!.requiredEngines.has(engineB!)).toBe(true);

    await engineManager.launch();
    expect(engineA!['hasLaunched']).toBe(true);
    expect(engineB!['hasLaunched']).toBe(true);

    // 确保 B 在 A 之前启动
    const sortedEngines = topologicalSort(
      engineManager['providedEngines'],
      (engine) => engine.requiredEngines,
    );
    expect(sortedEngines.indexOf(engineB!)).toBeLessThan(
      sortedEngines.indexOf(engineA!),
    );
  });

  it('应该处理引擎内部的模块执行顺序', async () => {
    const engineManager = new EngineManagerBase(
      (self) => {
        const engine = new TestEngine(self);
        engine['requireEngines'](new TestEngine(self));
        return engine;
      },
      (self) => new TestEngine(self),
    );

    const [engineA, engineB] = Array.from(
      engineManager['providedEngines'],
    ) as TestEngine[];

    let currentIndex = 0;
    class TestModuleA extends ModuleBase {
      public setupOrder: number = -1;
      public startOrder: number = -1;
      async onSetup() {
        this.setupOrder = currentIndex++;
      }

      async onStart() {
        this.startOrder = currentIndex++;
      }
    }
    class TestModuleB extends ModuleBase {
      public setupOrder: number = -1;
      public startOrder: number = -1;
      async onSetup() {
        this.setupOrder = currentIndex++;
      }

      async onStart() {
        this.startOrder = currentIndex++;
      }
    }
    const moduleA = new TestModuleA(engineA);
    const moduleB = new TestModuleB(engineB);

    engineA['providerModules'](moduleA);
    engineB['providerModules'](moduleB);

    await engineManager.launch();

    expect(moduleB.setupOrder).toBe(0);
    expect(moduleB.startOrder).toBe(1);
    expect(moduleA.setupOrder).toBe(2);
    expect(moduleA.startOrder).toBe(3);
  });

  it('应该正确获取指定类型的所有引擎', () => {
    class TestOtherEngine extends EngineBase {}

    const engineManager = new EngineManagerBase(
      (self) => new TestEngine(self),
      (self) => new TestEngine(self),
      (self) => new (class extends TestEngine {})(self), // 另一个不同类型的引擎
      (self) => new TestOtherEngine(self),
    );

    const fetchedEngines = engineManager.getEngines(TestEngine);
    expect(fetchedEngines.length).toBe(3); // 期望 TestEngine 类型的引擎有 2 个
    expect(fetchedEngines[0]).toBeInstanceOf(TestEngine);
    expect(fetchedEngines[1]).toBeInstanceOf(TestEngine);
    expect(fetchedEngines[2]).toBeInstanceOf(TestEngine);
    const fetchedOtherEngines = engineManager.getEngines(TestOtherEngine);
    expect(fetchedOtherEngines.length).toBe(1); // 期望 TestEngine 类型的引擎有 2 个
    expect(fetchedOtherEngines[0]).toBeInstanceOf(TestOtherEngine);
  });
});
