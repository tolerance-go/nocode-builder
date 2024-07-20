import { LocalState } from '@/common/controllers/LocalState';
import { Module } from '@/common/types';

export type ModuleConstructor = Module | ((engineAPI: EngineAPI) => Module);

export interface EngineAPI {
  setLocalStateItem: (key: string, value: unknown) => void;
  getLocalStateItem: <T>(key: string) => T | null;
}

export class Engine {
  private modules: Set<Module>;
  private dependencies: Map<Module, Set<Module>>;
  private dependents: Map<Module, Set<Module>>;
  private localState: LocalState;
  private initializePromise: Promise<void>;

  constructor(...moduleConstructors: ModuleConstructor[]) {
    this.modules = new Set();
    this.dependencies = new Map();
    this.dependents = new Map();
    this.localState = new LocalState();
    this.initializePromise = this.initModules(moduleConstructors);
  }

  private async initModules(moduleConstructors: ModuleConstructor[]) {
    // 先加载本地状态
    await this.localState.load();

    // 初始化 Actors
    moduleConstructors.forEach((ctor) => {
      let module: Module;
      if (typeof ctor === 'function') {
        module = ctor(this.getEngineAPI());
      } else {
        module = ctor;
      }
      this.modules.add(module);
    });

    // 收集依赖关系
    this.collectDependencies();
  }

  private collectDependencies() {
    this.modules.forEach((module) => {
      const deps = module.requiredModules;
      this.dependencies.set(module, deps);

      deps.forEach((dep) => {
        if (!this.dependents.has(dep)) {
          this.dependents.set(dep, new Set());
        }
        this.dependents.get(dep)?.add(module);
      });
    });
  }

  public async launch() {
    await this.initializePromise;
    const sortedActors = this.topologicalSort();
    await this.setupModules(sortedActors);
    await this.startModules(sortedActors);
  }

  private async setupModules(modules: Module[]) {
    await Promise.all(modules.map((module) => module.setup()));
  }

  private async startModules(modules: Module[]) {
    await Promise.all(modules.map((module) => module.start()));
  }

  private topologicalSort(): Module[] {
    const sorted: Module[] = [];
    const visited = new Set<Module>();
    const tempMarks = new Set<Module>();

    const visit = (module: Module) => {
      if (tempMarks.has(module)) {
        throw new Error('Circular dependency detected');
      }
      if (!visited.has(module)) {
        tempMarks.add(module);
        this.dependencies.get(module)?.forEach(visit);
        tempMarks.delete(module);
        visited.add(module);
        sorted.push(module);
      }
    };

    this.modules.forEach((module) => {
      if (!visited.has(module)) {
        visit(module);
      }
    });

    return sorted;
  }

  private getEngineAPI(): EngineAPI {
    return {
      setLocalStateItem: this.localState.set.bind(this.localState),
      getLocalStateItem: this.localState.get.bind(this.localState),
    };
  }
}
