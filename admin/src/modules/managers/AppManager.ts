import { ManagerBase } from '../base';

export class AppManager extends ManagerBase {
  public constructor() {
    super();
  }

  requires(): this {
    return super.requireModules();
  }
}
