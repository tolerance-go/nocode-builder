import { ModuleBase } from '@/base';
import { UserModelTable } from '../model-tables/UserModelTable';

export class 后台数据管理模块 extends ModuleBase {
  protected requireModules(): void {
    super.requireModules(new UserModelTable(this.engine));
  }
}
