import { describe, expect, it } from 'vitest';
import { EngineManagerBase } from '.';
import { EngineBase } from '../Engine';
import { ModuleBase } from '../Module';
import { topologicalSort } from '../utils';

class TestEngine extends EngineBase {}

describe('EngineManagerBase', () => {
  it('应该正确初始化引擎并收集依赖关系', async () => {
    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestEngine(this), new TestEngine(this));
      }
    }

    const engineManager = new TestEngineManager();

    await engineManager.launch();

    const [engineA, engineB] = Array.from(
      engineManager['providedEngines'],
    ) as TestEngine[];

    expect(engineA.engineManager).toBe(engineManager);
    expect(engineB.engineManager).toBe(engineManager);
    expect(engineManager['providedEngines'].has(engineA)).toBe(true);
    expect(engineManager['providedEngines'].has(engineB)).toBe(true);
  });

  it('应该正确启动所有引擎', async () => {
    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestEngine(this), new TestEngine(this));
      }
    }
    const engineManager = new TestEngineManager();
    await engineManager.launch();

    const [engineA, engineB] = Array.from(
      engineManager['providedEngines'],
    ) as TestEngine[];

    expect(engineA['hasLaunched']).toBe(true);
    expect(engineB['hasLaunched']).toBe(true);
  });

  it('应该按拓扑排序启动引擎', async () => {
    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestEngine(this), new TestEngine(this));
      }
    }
    const engineManager = new TestEngineManager();
    await engineManager.launch();

    const sortedEngines = topologicalSort(
      engineManager['providedEngines'],
      (engine) => engine.requiredEngines,
    );

    expect(sortedEngines).toEqual(Array.from(engineManager['allEngines']));
  });

  it('应该正确获取指定类型的引擎', async () => {
    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestEngine(this), new TestEngine(this));
      }
    }
    const engineManager = new TestEngineManager();
    await engineManager.launch();

    const [engineA] = Array.from(
      engineManager['providedEngines'],
    ) as TestEngine[];

    const fetchedEngine = engineManager.getEngine(TestEngine);
    expect(fetchedEngine).toBe(engineA);
  });

  it('没有找到指定类型的引擎时应该抛出错误', async () => {
    class NonExistentEngine extends TestEngine {}
    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestEngine(this), new TestEngine(this));
      }
    }
    const engineManager = new TestEngineManager();
    await engineManager.launch();

    expect(() => engineManager.getEngine(NonExistentEngine)).toThrow(
      'Engine of type NonExistentEngine not found',
    );
  });

  it('应该处理引擎之间的依赖关系', async () => {
    class TestAEngine extends EngineBase {
      protected requireEngines(): void {
        super.requireEngines(new TestBEngine(this.engineManager));
      }
    }

    class TestBEngine extends EngineBase {}

    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestAEngine(this));
      }
    }

    const engineManager = new TestEngineManager();
    await engineManager.launch();
    const engineA: TestEngine = engineManager.getEngine(TestAEngine);
    const engineB: TestEngine = engineManager.getEngine(TestBEngine);

    expect(engineA.requiredEngines.has(engineB)).toBe(true);
    expect(engineA['hasLaunched']).toBe(true);
    expect(engineB['hasLaunched']).toBe(true);

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
    class TestAEngine extends EngineBase {
      protected requireEngines(): void {
        super.requireEngines(new TestBEngine(this.engineManager));
      }
      protected providerModules(): void {
        super.providerModules(new TestModuleA(this));
      }
    }

    class TestBEngine extends EngineBase {
      protected providerModules(): void {
        super.providerModules(new TestModuleB(this));
      }
    }

    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestAEngine(this), new TestEngine(this));
      }
    }

    const engineManager = new TestEngineManager();
    await engineManager.launch();

    const engineA = engineManager.getEngine(TestAEngine);
    const engineB = engineManager.getEngine(TestBEngine);

    const moduleA = engineA.getModule(TestModuleA);
    const moduleB = engineB.getModule(TestModuleB);

    expect(moduleB.setupOrder).toBe(0);
    expect(moduleB.startOrder).toBe(1);
    expect(moduleA.setupOrder).toBe(2);
    expect(moduleA.startOrder).toBe(3);
  });

  it('应该正确获取指定类型的所有引擎', async () => {
    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(
          new TestEngine(this),
          new TestEngine(this),
          new (class extends TestEngine {})(this), // 另一个不同类型的引擎
          new TestOtherEngine(this),
        );
      }
    }

    class TestOtherEngine extends EngineBase {}

    const engineManager = new TestEngineManager();

    await engineManager.launch();

    const fetchedEngines = engineManager.getProvidedEngines(TestEngine);
    expect(fetchedEngines.length).toBe(3); // 期望 TestEngine 类型的引擎有 2 个
    expect(fetchedEngines[0]).toBeInstanceOf(TestEngine);
    expect(fetchedEngines[1]).toBeInstanceOf(TestEngine);
    expect(fetchedEngines[2]).toBeInstanceOf(TestEngine);
    const fetchedOtherEngines =
      engineManager.getProvidedEngines(TestOtherEngine);
    expect(fetchedOtherEngines.length).toBe(1); // 期望 TestEngine 类型的引擎有 2 个
    expect(fetchedOtherEngines[0]).toBeInstanceOf(TestOtherEngine);
  });

  it('toJSON', async () => {
    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestEngine(this));
      }
    }
    class TestEngine extends EngineBase {}
    const engineManager = new TestEngineManager();

    expect(JSON.stringify(engineManager)).toMatchInlineSnapshot(
      `"{"name":"TestEngineManager"}"`,
    );
  });
});
