import {
  BluemapProjectModelRecord,
  DataTableProjectModelRecord,
  ProjectDetailModelRecord,
  ProjectGroupModelRecord,
  ProjectModelRecord,
  UserModelRecord,
  ViewProjectModelRecord,
} from '@/_gen/model-records';
import { EngineBase, ModuleBase } from '@/base';
import { OperationType } from '@/common/controllers';
import { api } from '@/globals';
import { TableName } from '@unocode/common';
import { 数据表项目详情表模块 } from '../models/数据表项目详情表';
import { 用户表模块 } from '../models/用户表模块';
import { 蓝图项目详情表模块 } from '../models/蓝图项目详情表';
import { 视图项目详情表模块 } from '../models/视图项目详情表';
import { 项目组表模块 } from '../models/项目组表模块';
import { 项目表模块 } from '../models/项目表模块';
import { 项目详情表模块 } from '../models/项目详情表';
import { convertDatesToISO } from './utils';

type TransactionFunction = (tables: {
  用户表模块实例: 用户表模块;
  项目表模块实例: 项目表模块;
  项目组表模块实例: 项目组表模块;
  蓝图项目详情表模块实例: 蓝图项目详情表模块;
  视图项目详情表模块实例: 视图项目详情表模块;
  数据表项目详情表模块实例: 数据表项目详情表模块;
  项目详情表模块实例: 项目详情表模块;
}) => Promise<void> | void;

interface Operation {
  tableName: TableName;
  operation: OperationType;
  record?:
    | UserModelRecord
    | ProjectModelRecord
    | ProjectGroupModelRecord
    | ProjectDetailModelRecord
    | ViewProjectModelRecord
    | DataTableProjectModelRecord
    | BluemapProjectModelRecord;
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
          const {
            用户表模块实例,
            项目表模块实例,
            项目组表模块实例,
            蓝图项目详情表模块实例,
            视图项目详情表模块实例,
            数据表项目详情表模块实例,
            项目详情表模块实例,
          } = this.getTableInstances();

          const 操作收集器: Operation[] = [];
          const listeners = this.createListeners(操作收集器);

          const 用户表模块实例TableUnregister =
            用户表模块实例.table.registerListener(listeners.用户表模块监听器);
          const 项目表模块实例TableUnregister =
            项目表模块实例.table.registerListener(listeners.项目表模块监听器);
          const 项目组表模块实例TableUnregister =
            项目组表模块实例.table.registerListener(
              listeners.项目组表模块监听器,
            );
          const 蓝图项目详情表模块实例TableUnregister =
            蓝图项目详情表模块实例.table.registerListener(
              listeners.蓝图项目详情表监听器,
            );
          const 视图项目详情表模块实例TableUnregister =
            视图项目详情表模块实例.table.registerListener(
              listeners.视图项目详情表监听器,
            );
          const 数据表项目详情表模块实例TableUnregister =
            数据表项目详情表模块实例.table.registerListener(
              listeners.数据表项目详情表监听器,
            );
          const 项目详情表模块实例TableUnregister =
            项目详情表模块实例.table.registerListener(
              listeners.项目详情表监听器,
            );

          try {
            await 用户表模块实例.table.$transaction(async () => {
              await 项目表模块实例.table.$transaction(async () => {
                await 项目组表模块实例.table.$transaction(async () => {
                  await 蓝图项目详情表模块实例.table.$transaction(async () => {
                    await 视图项目详情表模块实例.table.$transaction(
                      async () => {
                        await 数据表项目详情表模块实例.table.$transaction(
                          async () => {
                            await 项目详情表模块实例.table.$transaction(
                              async () => {
                                await fn({
                                  用户表模块实例,
                                  项目表模块实例,
                                  项目组表模块实例,
                                  蓝图项目详情表模块实例,
                                  视图项目详情表模块实例,
                                  数据表项目详情表模块实例,
                                  项目详情表模块实例,
                                });
                              },
                            );
                          },
                        );
                      },
                    );
                  });
                });
              });
            });

            // 将操作插入到 remoteTransactionQueue 队列中
            this.remoteTransactionQueue = this.remoteTransactionQueue.then(
              async () => {
                if (操作收集器.length === 0) {
                  return;
                }

                await api.syncs.applyProjectDiff({
                  operations: 操作收集器.map((operation) => {
                    return {
                      tableName: operation.tableName,
                      operation: operation.operation,
                      record: {
                        userOperationRecord:
                          operation.record instanceof UserModelRecord
                            ? convertDatesToISO(operation.record)
                            : undefined,
                        projectOperationRecord:
                          operation.record instanceof ProjectModelRecord
                            ? convertDatesToISO(operation.record)
                            : undefined,
                        projectGroupOperationRecord:
                          operation.record instanceof ProjectGroupModelRecord
                            ? convertDatesToISO(operation.record)
                            : undefined,
                        projectDetailOperationRecord:
                          operation.record instanceof ProjectDetailModelRecord
                            ? convertDatesToISO(operation.record)
                            : undefined,
                        viewProjectOperationRecord:
                          operation.record instanceof ViewProjectModelRecord
                            ? convertDatesToISO(operation.record)
                            : undefined,
                        dataTableProjectOperationRecord:
                          operation.record instanceof
                          DataTableProjectModelRecord
                            ? convertDatesToISO(operation.record)
                            : undefined,
                        bluemapProjectOperationRecord:
                          operation.record instanceof BluemapProjectModelRecord
                            ? convertDatesToISO(operation.record)
                            : undefined,
                      },
                    };
                  }),
                });
              },
            );

            resolve();
          } catch (error) {
            reject(error);
          } finally {
            用户表模块实例TableUnregister();
            项目表模块实例TableUnregister();
            项目组表模块实例TableUnregister();
            蓝图项目详情表模块实例TableUnregister();
            视图项目详情表模块实例TableUnregister();
            数据表项目详情表模块实例TableUnregister();
            项目详情表模块实例TableUnregister();
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
      蓝图项目详情表模块.getInstance(this.engine),
      视图项目详情表模块.getInstance(this.engine),
      数据表项目详情表模块.getInstance(this.engine),
      项目详情表模块.getInstance(this.engine),
    );
  }

  private getTableInstances() {
    const 用户表模块实例 = this.getDependModule(用户表模块);
    const 项目表模块实例 = this.getDependModule(项目表模块);
    const 项目组表模块实例 = this.getDependModule(项目组表模块);
    const 蓝图项目详情表模块实例 = this.getDependModule(蓝图项目详情表模块);
    const 视图项目详情表模块实例 = this.getDependModule(视图项目详情表模块);
    const 数据表项目详情表模块实例 = this.getDependModule(数据表项目详情表模块);
    const 项目详情表模块实例 = this.getDependModule(项目详情表模块);
    return {
      用户表模块实例,
      项目表模块实例,
      项目组表模块实例,
      蓝图项目详情表模块实例,
      视图项目详情表模块实例,
      数据表项目详情表模块实例,
      项目详情表模块实例,
    };
  }

  private createListeners(操作收集器: Operation[]) {
    const 用户表模块监听器 = (
      operation: OperationType,
      record?: UserModelRecord,
    ) => {
      操作收集器.push({ tableName: TableName.User, operation, record });
    };
    const 项目表模块监听器 = (
      operation: OperationType,
      record?: ProjectModelRecord,
    ) => {
      操作收集器.push({
        tableName: TableName.Project,
        operation,
        record,
      });
    };
    const 项目组表模块监听器 = (
      operation: OperationType,
      record?: ProjectGroupModelRecord,
    ) => {
      操作收集器.push({
        tableName: TableName.ProjectGroup,
        operation,
        record,
      });
    };
    const 蓝图项目详情表监听器 = (
      operation: OperationType,
      record?: BluemapProjectModelRecord,
    ) => {
      操作收集器.push({
        tableName: TableName.BluemapProject,
        operation,
        record,
      });
    };
    const 视图项目详情表监听器 = (
      operation: OperationType,
      record?: ViewProjectModelRecord,
    ) => {
      操作收集器.push({
        tableName: TableName.ViewProject,
        operation,
        record,
      });
    };
    const 数据表项目详情表监听器 = (
      operation: OperationType,
      record?: DataTableProjectModelRecord,
    ) => {
      操作收集器.push({
        tableName: TableName.DataTableProject,
        operation,
        record,
      });
    };
    const 项目详情表监听器 = (
      operation: OperationType,
      record?: ProjectDetailModelRecord,
    ) => {
      操作收集器.push({
        tableName: TableName.ProjectDetail,
        operation,
        record,
      });
    };

    return {
      用户表模块监听器,
      项目表模块监听器,
      项目组表模块监听器,
      蓝图项目详情表监听器,
      视图项目详情表监听器,
      数据表项目详情表监听器,
      项目详情表监听器,
    };
  }
}
