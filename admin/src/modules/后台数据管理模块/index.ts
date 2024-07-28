import { EngineBase, ModuleBase } from '@/base';
import { 用户表模块 } from '../models/用户表模块';
import { 项目组表模块 } from '../models/项目组表模块';
import { 项目表模块 } from '../models/项目表模块';
import { OperationType } from '@/common/controllers';

type TransactionFunction = (tables: {
  用户表模块实例: 用户表模块;
  项目表模块实例: 项目表模块;
  项目组表模块实例: 项目组表模块;
}) => Promise<void> | void;

interface Operation {
  tableName: string;
  operation: OperationType;
  record?: unknown;
}

export class 后台数据管理模块 extends ModuleBase {
  private static instance: 后台数据管理模块;

  public static getInstance(engine: EngineBase): 后台数据管理模块 {
    if (!后台数据管理模块.instance) {
      后台数据管理模块.instance = new 后台数据管理模块(engine);
    }

    return 后台数据管理模块.instance;
  }

  private transactionQueue: Promise<void>;
  private remoteTransactionQueue: Promise<void>;

  constructor(engine: EngineBase) {
    super(engine);
    this.transactionQueue = Promise.resolve();
    this.remoteTransactionQueue = Promise.resolve();
  }

  public async $transaction(fn: TransactionFunction): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.transactionQueue = this.transactionQueue
        .then(async () => {
          const 用户表模块实例 = this.getDependModule(用户表模块);
          const 项目表模块实例 = this.getDependModule(项目表模块);
          const 项目组表模块实例 = this.getDependModule(项目组表模块);

          const 操作收集器: Operation[] = [];

          const 用户表模块监听器 = (
            operation: OperationType,
            record?: unknown,
          ) => {
            操作收集器.push({ tableName: '用户表模块', operation, record });
          };
          const 项目表模块监听器 = (
            operation: OperationType,
            record?: unknown,
          ) => {
            操作收集器.push({ tableName: '项目表模块', operation, record });
          };
          const 项目组表模块监听器 = (
            operation: OperationType,
            record?: unknown,
          ) => {
            操作收集器.push({ tableName: '项目组表模块', operation, record });
          };

          const 用户表模块实例TableUnregister =
            用户表模块实例.table.registerListener(用户表模块监听器);
          const 项目表模块实例TableUnregister =
            项目表模块实例.table.registerListener(项目表模块监听器);
          const 项目组表模块实例TableUnregister =
            项目组表模块实例.table.registerListener(项目组表模块监听器);

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

            // 将操作插入到 remoteTransactionQueue 队列中
            this.remoteTransactionQueue = this.remoteTransactionQueue.then(
              async () => {
                console.log('操作收集器', 操作收集器);
                for (const 操作 of 操作收集器) {
                  // 处理每个操作，具体实现根据业务需求
                  console.log('处理操作:', 操作);
                  // 在这里添加你要对每个操作执行的代码
                }
              },
            );

            resolve();
          } catch (error) {
            reject(error);
          } finally {
            用户表模块实例TableUnregister();
            项目表模块实例TableUnregister();
            项目组表模块实例TableUnregister();
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
