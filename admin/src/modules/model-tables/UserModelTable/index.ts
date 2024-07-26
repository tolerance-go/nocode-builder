import { UserModel } from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';

class UserModelTable extends ModuleBase {
  table: string;
  list: UserModel[] = [];

  constructor(engine: EngineBase) {
    super(engine);
    this.table = 'user_model';
  }
}

export { UserModelTable };
