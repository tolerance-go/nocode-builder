import { DataTableProjectModelRecord } from '@/_gen/model-records';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { api } from '@/globals';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { TableName } from '@unocode/common';
import { 用户表模块 } from '../用户表模块';
import { TableTransactions } from '@/modules/后台数据管理模块';

export class ClientDataTableProjectModel extends DataTableProjectModelRecord {
  // 静态方法: 从 DataTableProjectModelRecord 实例创建 ClientDataTableProjectModel 实例
  static createFromRecord(
    record: DataTableProjectModelRecord,
  ): ClientDataTableProjectModel {
    const instance = new ClientDataTableProjectModel({
      id: record.id,
      ownerId: record.ownerId,
    });

    instance.createdAt = record.createdAt;
    instance.updatedAt = record.updatedAt;

    return instance;
  }

  constructor({ id, ownerId }: { id: number; ownerId: number }) {
    super({
      id,
      ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export class 数据表项目详情表模块 extends ModuleBase {
  static tableName = TableName.DataTableProject;
  private static instance: 数据表项目详情表模块;

  public static getInstance(engine: EngineBase): 数据表项目详情表模块 {
    if (!数据表项目详情表模块.instance) {
      数据表项目详情表模块.instance = new 数据表项目详情表模块(engine);
    }

    return 数据表项目详情表模块.instance;
  }

  table: Table<ClientDataTableProjectModel>;

  constructor(engine: EngineBase) {
    super(engine);
    this.table = new Table<ClientDataTableProjectModel>();

    window.dataTableProjectTable = this.table;
  }

  addDataTableProject(txs: TableTransactions): ClientDataTableProjectModel {
    const 用户表模块实例 = this.getDependModule(用户表模块);
    const ownerId = 用户表模块实例.loginUser.id;

    const record = new ClientDataTableProjectModel({
      id: txs.数据表项目详情表Tx.getNextId(),
      ownerId,
    });

    txs.数据表项目详情表Tx.addRecord(record);

    return record;
  }

  protected requireModules(): void {
    super.requireModules(
      事件中心系统.getInstance(this.engine),
      用户表模块.getInstance(this.engine),
    );
  }

  protected async onSetup(): Promise<void> {
    if (!this.getDependModule(用户表模块).currentLoginUser) {
      return;
    }

    const dataTableProjects =
      await api.dataTableProjects.getDataTableProjects();
    this.table.initializeRecords(
      dataTableProjects.map((dataTableProject) =>
        ClientDataTableProjectModel.createFromRecord({
          id: dataTableProject.id,
          ownerId: dataTableProject.ownerId,
          createdAt: new Date(dataTableProject.createdAt),
          updatedAt: new Date(dataTableProject.updatedAt),
        }),
      ),
    );
  }
}
