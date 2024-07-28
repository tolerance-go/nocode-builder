import { EngineBase, ModuleBase } from '@/base';
import { 用户表模块 } from '../models/用户表模块';
import { 项目组表模块 } from '../models/项目组表模块';
import { 项目表模块 } from '../models/项目表模块';

type TransactionFunction = (tables: {
  用户表模块实例: 用户表模块;
  项目表模块实例: 项目表模块;
  项目组表模块实例: 项目组表模块;
}) => Promise<void> | void;

export class 后台数据管理模块 extends ModuleBase {
  private static instance: 后台数据管理模块;

  public static getInstance(engine: EngineBase): 后台数据管理模块 {
    if (!后台数据管理模块.instance) {
      后台数据管理模块.instance = new 后台数据管理模块(engine);
    }

    return 后台数据管理模块.instance;
  }

  private transactionQueue: Promise<void>;

  constructor(engine: EngineBase) {
    super(engine);
    this.transactionQueue = Promise.resolve();
  }

  public async $transaction(fn: TransactionFunction): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.transactionQueue = this.transactionQueue
        .then(async () => {
          const 用户表模块实例 = this.getDependModule(用户表模块);
          const 项目表模块实例 = this.getDependModule(项目表模块);
          const 项目组表模块实例 = this.getDependModule(项目组表模块);

          项目表模块实例.table.registerListener;

          try {
            await 用户表模块实例.table.$transaction(async () => {
              await 项目表模块实例.table.$transaction(async () => {
                await 项目组表模块实例.table.$transaction(async () => {
                  await fn({
                    用户表模块实例,
                    项目表模块实例,
                    项目组表模块实例,
                  });
                });
              });
            });
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => {
          console.error('队列任务执行出错', error);
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
