import { describe, it, expect } from 'vitest';
import { collectDependencies } from '.';

class MockEngine {
  requiredEngines: Set<MockEngine>;

  constructor(requiredEngines: MockEngine[] = []) {
    this.requiredEngines = new Set(requiredEngines);
  }
}

class MockModule {
  requiredModules: Set<MockModule>;

  constructor(requiredModules: MockModule[] = []) {
    this.requiredModules = new Set(requiredModules);
  }
}

describe('collectDependencies', () => {
  it('应正确收集引擎的依赖关系和被依赖关系', () => {
    const engineA = new MockEngine();
    const engineB = new MockEngine([engineA]);
    const engineC = new MockEngine([engineA, engineB]);

    const engines = new Set([engineA, engineB, engineC]);
    const dependencies = new Map();
    const dependents = new Map();

    collectDependencies(
      engines,
      dependencies,
      dependents,
      (engine) => engine.requiredEngines,
    );

    expect(dependencies.get(engineA)).toEqual(new Set());
    expect(dependencies.get(engineB)).toEqual(new Set([engineA]));
    expect(dependencies.get(engineC)).toEqual(new Set([engineA, engineB]));

    expect(dependents.get(engineA)).toEqual(new Set([engineB, engineC]));
    expect(dependents.get(engineB)).toEqual(new Set([engineC]));
    expect(dependents.get(engineC)).toBe(undefined);
  });

  it('应正确收集模块的依赖关系和被依赖关系', () => {
    const moduleA = new MockModule();
    const moduleB = new MockModule([moduleA]);
    const moduleC = new MockModule([moduleA, moduleB]);

    const modules = new Set([moduleA, moduleB, moduleC]);
    const dependencies = new Map();
    const dependents = new Map();

    collectDependencies(
      modules,
      dependencies,
      dependents,
      (module) => module.requiredModules,
    );

    expect(dependencies.get(moduleA)).toEqual(new Set());
    expect(dependencies.get(moduleB)).toEqual(new Set([moduleA]));
    expect(dependencies.get(moduleC)).toEqual(new Set([moduleA, moduleB]));

    expect(dependents.get(moduleA)).toEqual(new Set([moduleB, moduleC]));
    expect(dependents.get(moduleB)).toEqual(new Set([moduleC]));
    expect(dependents.get(moduleC)).toBe(undefined);
  });

  it('应正确处理模块的递归依赖', () => {
    const moduleA = new MockModule();
    const moduleB = new MockModule([moduleA]);
    const moduleC = new MockModule([moduleB]);
    const moduleD = new MockModule([moduleC]);

    const modules = new Set([moduleA, moduleB, moduleC, moduleD]);
    const dependencies = new Map();
    const dependents = new Map();

    collectDependencies(
      modules,
      dependencies,
      dependents,
      (module) => module.requiredModules,
    );

    expect(dependencies.get(moduleA)).toEqual(new Set());
    expect(dependencies.get(moduleB)).toEqual(new Set([moduleA]));
    expect(dependencies.get(moduleC)).toEqual(new Set([moduleB]));
    expect(dependencies.get(moduleD)).toEqual(new Set([moduleC]));

    expect(dependents.get(moduleA)).toEqual(new Set([moduleB]));
    expect(dependents.get(moduleB)).toEqual(new Set([moduleC]));
    expect(dependents.get(moduleC)).toEqual(new Set([moduleD]));
    expect(dependents.get(moduleD)).toBe(undefined);
  });

  it('应正确处理引擎的递归依赖', () => {
    const engineA = new MockEngine();
    const engineB = new MockEngine([engineA]);
    const engineC = new MockEngine([engineB]);
    const engineD = new MockEngine([engineC]);

    const engines = new Set([engineA, engineB, engineC, engineD]);
    const dependencies = new Map();
    const dependents = new Map();

    collectDependencies(
      engines,
      dependencies,
      dependents,
      (engine) => engine.requiredEngines,
    );

    expect(dependencies.get(engineA)).toEqual(new Set());
    expect(dependencies.get(engineB)).toEqual(new Set([engineA]));
    expect(dependencies.get(engineC)).toEqual(new Set([engineB]));
    expect(dependencies.get(engineD)).toEqual(new Set([engineC]));

    expect(dependents.get(engineA)).toEqual(new Set([engineB]));
    expect(dependents.get(engineB)).toEqual(new Set([engineC]));
    expect(dependents.get(engineC)).toEqual(new Set([engineD]));
    expect(dependents.get(engineD)).toBe(undefined);
  });
});
