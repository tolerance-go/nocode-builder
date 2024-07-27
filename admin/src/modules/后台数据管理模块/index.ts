import { EngineBase, ModuleBase } from '@/base';
import { ClientUserModel, 用户表模块 } from '../models/用户表模块';
import { ClientProjectModel, 项目表模块 } from '../models/项目表模块';
import { ClientProjectGroupModel, 项目组表模块 } from '../models/项目组表模块';
import { Table } from '@/common/controllers';

export class 后台数据管理模块 extends ModuleBase {
  private static instance: 后台数据管理模块;

  public static getInstance(engine: EngineBase): 后台数据管理模块 {
    if (!后台数据管理模块.instance) {
      后台数据管理模块.instance = new 后台数据管理模块(engine);
    }

    return 后台数据管理模块.instance;
  }

  public async $transaction(
    fn: (tables: {
      用户表: Table<ClientUserModel>;
      项目表: Table<ClientProjectModel>;
      项目组表: Table<ClientProjectGroupModel>;
    }) => Promise<void> | void,
  ): Promise<void> {
    const 用户表 = 用户表模块.getInstance(this.engine).table;
    const 项目表 = 项目表模块.getInstance(this.engine).table;
    const 项目组表 = 项目组表模块.getInstance(this.engine).table;

    await 用户表.$transaction(async () => {
      await 项目表.$transaction(async () => {
        await 项目组表.$transaction(async () => {
          await fn({ 用户表, 项目表, 项目组表 });
        });
      });
    });
  }

  protected requireModules(): void {
    super.requireModules(
      用户表模块.getInstance(this.engine),
      项目表模块.getInstance(this.engine),
      项目组表模块.getInstance(this.engine),
    );
  }
}
