import { Actor, EnvObject, Manager, System } from '@/common/types';

export abstract class ActorBase implements Actor {
  public setupProcessing: PromiseWithResolvers<void>;
  public startProcessing: PromiseWithResolvers<void>;

  public requiredActors: Set<Actor> = new Set(); // 当前 Actor 依赖的 Actors
  public dependentActors: Set<Actor> = new Set(); // 依赖当前 Actor 的 Actors

  protected hasStarted: boolean = false; // 用于跟踪 start 方法是否已经执行过
  protected hasSetup: boolean = false; // 用于跟踪 start 方法是否已经执行过

  constructor() {
    this.setupProcessing = Promise.withResolvers<void>();
    this.startProcessing = Promise.withResolvers<void>();
  }

  // 导入其他 Actor
  protected requireActors(...actors: Actor[]): this {
    actors.forEach((actor) => {
      if (!this.requiredActors.has(actor)) {
        this.requiredActors.add(actor);
        if (actor instanceof ActorBase) {
          actor.addDependentActor(this);
        }
      }
    });
    return this;
  }

  abstract requires(...actors: Actor[]): this;

  // 添加依赖当前 Actor 的 Actor
  private addDependentActor(actor: Actor): void {
    this.dependentActors.add(actor);
  }

  // 获取指定类型的 Actor 实例
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requireActor<T extends Actor>(actorClass: new (...args: any[]) => T): T {
    for (const actor of this.requiredActors) {
      if (actor instanceof actorClass) {
        return actor;
      }
    }
    throw new Error(`Actor of type ${actorClass.name} not found`);
  }

  // 启动
  async setup(): Promise<void> {
    if (this.hasSetup) {
      throw new Error('Actor already setup');
    }

    await Promise.all(
      Array.from(this.requiredActors).map(
        (actor) => actor.setupProcessing.promise,
      ),
    );
    await this.onSetup(); // 调用 start 逻辑函数
    this.setupProcessing.resolve();
    this.hasSetup = true; // 标记为已启动
  }

  async start(): Promise<void> {
    if (this.hasStarted) {
      throw new Error('Actor already started');
    }

    await Promise.all(
      Array.from(this.requiredActors).map(
        (actor) => actor.startProcessing.promise,
      ),
    );
    await this.onStart(); // 调用 start 逻辑函数
    this.startProcessing.resolve();
    this.hasStarted = true; // 标记为已启动
  }

  // 抽象的 start 逻辑函数，需要在继承类中实现
  protected async onSetup(): Promise<void> {}
  protected async onStart(): Promise<void> {}
}

export abstract class SystemBase extends ActorBase implements System {}

export abstract class ManagerBase extends ActorBase implements Manager {}

export abstract class EnvObjectBase extends ActorBase implements EnvObject {}
