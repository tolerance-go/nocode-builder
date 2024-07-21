import { describe, it, expect, beforeEach } from 'vitest';
import { EngineManagerBase } from '.';
import { EngineBase } from '../Engine';
import { collectDependencies, topologicalSort } from '../utils';

class TestEngine extends EngineBase {
  protected async onLaunch() {
    // 自定义的 launch 逻辑
  }
}

describe('EngineManagerBase', () => {
  let engineManager: EngineManagerBase;
  let engineA: TestEngine;
  let engineB: TestEngine;

  beforeEach(() => {
    engineA = new TestEngine();
    engineB = new TestEngine();
    engineManager = new EngineManagerBase(engineA, engineB);
  });

  it('应该正确初始化引擎并收集依赖关系', () => {
    expect(engineA.engineManager).toBe(engineManager);
    expect(engineB.engineManager).toBe(engineManager);
    expect(engineManager['engines'].has(engineA)).toBe(true);
    expect(engineManager['engines'].has(engineB)).toBe(true);

    const dependencies = new Map();
    const dependents = new Map();
    collectDependencies(
      engineManager['engines'],
      dependencies,
      dependents,
      (engine) => engine.requiredEngines,
    );

    expect(dependencies).toEqual(engineManager['dependencies']);
    expect(dependents).toEqual(engineManager['dependents']);
  });

  it('应该正确启动所有引擎', async () => {
    await engineManager.launch();
    expect(engineA['hasLaunched']).toBe(true);
    expect(engineB['hasLaunched']).toBe(true);
  });

  it('应该按拓扑排序启动引擎', async () => {
    const sortedEngines = topologicalSort(
      engineManager['engines'],
      engineManager['dependencies'],
    );

    await engineManager.launch();
    expect(sortedEngines).toEqual(Array.from(engineManager['engines']));
  });

  it('应该正确获取指定类型的引擎', () => {
    const fetchedEngine = engineManager.getEngine(TestEngine);
    expect(fetchedEngine).toBe(engineA);
  });

  it('没有找到指定类型的引擎时应该抛出错误', () => {
    class NonExistentEngine extends TestEngine {}
    expect(() => engineManager.getEngine(NonExistentEngine)).toThrow(
      'Engine of type NonExistentEngine not found',
    );
  });

  it('重复调用 launch 应该抛出错误', async () => {
    await engineManager.launch();
    await expect(engineManager.launch()).rejects.toThrow(
      'Engine already launch',
    );
  });
});
