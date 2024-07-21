import { ManagerBase } from '@/base';
import { createActor } from 'xstate';
import { 异步同步状态机 } from './states';

export class AsyncStateManager extends ManagerBase {
  public 异步同步状态;

  constructor() {
    super();
    this.异步同步状态 = createActor(异步同步状态机);
  }

  protected async onSetup(): Promise<void> {
    this.异步同步状态.start().subscribe(() => {
      console.log('异步同步状态', this.异步同步状态.getSnapshot().value);
    });
  }
}
