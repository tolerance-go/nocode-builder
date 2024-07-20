import { Module } from '@/common/types';
import { LocalState } from '../../common/controllers/LocalState';

export type ModuleConstructor = Module | ((engineAPI: EngineAPI) => Module);

export interface EngineAPI {
  setLocalStateItem: (key: string, value: unknown) => void;
  getLocalStateItem: <T>(key: string) => T | null;
}

export class Engine {
  private actors: Set<Module>;
  private dependencies: Map<Module, Set<Module>>;
  private dependents: Map<Module, Set<Module>>;
  private localState: LocalState;
  private initializePromise: Promise<void>;

  constructor(...actorConstructors: ModuleConstructor[]) {
    this.actors = new Set();
    this.dependencies = new Map();
    this.dependents = new Map();
    this.localState = new LocalState();
    this.initializePromise = this.initActors(actorConstructors);
  }

  private async initActors(actorConstructors: ModuleConstructor[]) {
    // 先加载本地状态
    await this.localState.load();

    // 初始化 Actors
    actorConstructors.forEach((ctor) => {
      let actor: Module;
      if (typeof ctor === 'function') {
        actor = ctor(this.getEngineAPI());
      } else {
        actor = ctor;
      }
      this.actors.add(actor);
    });

    // 收集依赖关系
    this.collectDependencies();
  }

  private collectDependencies() {
    this.actors.forEach((actor) => {
      const deps = actor.requiredActors;
      this.dependencies.set(actor, deps);

      deps.forEach((dep) => {
        if (!this.dependents.has(dep)) {
          this.dependents.set(dep, new Set());
        }
        this.dependents.get(dep)?.add(actor);
      });
    });
  }

  public async launch() {
    await this.initializePromise;
    const sortedActors = this.topologicalSort();
    await this.setupActors(sortedActors);
    await this.startActors(sortedActors);
  }

  private async setupActors(actors: Module[]) {
    await Promise.all(actors.map((actor) => actor.setup()));
  }

  private async startActors(actors: Module[]) {
    await Promise.all(actors.map((actor) => actor.start()));
  }

  private topologicalSort(): Module[] {
    const sorted: Module[] = [];
    const visited = new Set<Module>();
    const tempMarks = new Set<Module>();

    const visit = (actor: Module) => {
      if (tempMarks.has(actor)) {
        throw new Error('Circular dependency detected');
      }
      if (!visited.has(actor)) {
        tempMarks.add(actor);
        this.dependencies.get(actor)?.forEach(visit);
        tempMarks.delete(actor);
        visited.add(actor);
        sorted.push(actor);
      }
    };

    this.actors.forEach((actor) => {
      if (!visited.has(actor)) {
        visit(actor);
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
