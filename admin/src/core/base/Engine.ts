import { Actor } from '@/common/types';

export class Engine {
  private actors: Set<Actor>;
  private dependencies: Map<Actor, Set<Actor>>;
  private dependents: Map<Actor, Set<Actor>>;

  constructor(...actors: Actor[]) {
    this.actors = new Set(actors);
    this.dependencies = new Map();
    this.dependents = new Map();
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
    const sortedActors = this.topologicalSort();
    await this.setupActors(sortedActors);
    await this.startActors(sortedActors);
  }

  private async setupActors(actors: Actor[]) {
    await Promise.all(actors.map((actor) => actor.setup()));
  }

  private async startActors(actors: Actor[]) {
    await Promise.all(actors.map((actor) => actor.start()));
  }

  private topologicalSort(): Actor[] {
    const sorted: Actor[] = [];
    const visited = new Set<Actor>();
    const tempMarks = new Set<Actor>();

    const visit = (actor: Actor) => {
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
}
