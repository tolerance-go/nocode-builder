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
    expect(dependents.get(engineC)).toEqual(undefined);
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
    expect(dependents.get(moduleC)).toEqual(undefined);
  });
});
