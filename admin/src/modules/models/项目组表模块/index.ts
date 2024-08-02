import { ProjectGroupModelRecord } from '@/_gen/model-records';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { api } from '@/globals';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { TableName } from '@unocode/common';
import { 用户表模块 } from '../用户表模块';
import { TableTransactions } from '@/modules/后台数据管理模块';

export class ClientProjectGroupModel extends ProjectGroupModelRecord {
  static createFromRecord(
    record: ProjectGroupModelRecord,
  ): ClientProjectGroupModel {
    const instance = new ClientProjectGroupModel({
      id: record.id,
      name: record.name,
      ownerId: record.ownerId,
      parentGroupId: record.parentGroupId,
    });

    instance.createdAt = record.createdAt;
    instance.updatedAt = record.updatedAt;

    return instance;
  }

  constructor({
    id,
    name,
    parentGroupId,
    ownerId,
  }: {
    id: number;
    name: string;
    parentGroupId: number | undefined;
    ownerId: number;
  }) {
    super({
      id,
      name,
      parentGroupId,
      ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export class 项目组表模块 extends ModuleBase {
  static tableName = TableName.ProjectGroup;
  private static instance: 项目组表模块;

  public static getInstance(engine: EngineBase): 项目组表模块 {
    if (!项目组表模块.instance) {
      项目组表模块.instance = new 项目组表模块(engine);
    }

    return 项目组表模块.instance;
  }

  table: Table<ClientProjectGroupModel>;

  constructor(engine: EngineBase) {
    super(engine);
    this.table = new Table<ClientProjectGroupModel>();

    window.projectGroupTable = this.table;
  }

  public removeProjectGroup(id: number, txs: TableTransactions): void {
    txs.项目组表Tx.deleteRecord(id);
  }

  public moveProjectGroup(
    id: number,
    newParentGroupId: number | undefined,
    txs: TableTransactions,
  ): ClientProjectGroupModel {
    const record = txs.项目组表Tx.findRecordOrThrow(id);

    record.parentGroupId = newParentGroupId;
    txs.项目组表Tx.updateRecord(record);

    return record;
  }

  public updateProjectGroup(
    id: number,
    data: {
      name?: string;
    },
    txs: TableTransactions,
  ): ClientProjectGroupModel {
    const record = txs.项目组表Tx.findRecordOrThrow(id);

    if (data.name !== undefined) {
      record.name = data.name;
    }

    txs.项目组表Tx.updateRecord(record);

    return record;
  }

  public addProjectGroup(
    data: {
      name: string;
      parentGroupId?: number;
    },
    txs: TableTransactions,
  ): ClientProjectGroupModel {
    const 用户表模块实例 = this.getDependModule(用户表模块);
    const ownerId = 用户表模块实例.loginUser.id;

    const record = new ClientProjectGroupModel({
      ...data,
      id: txs.项目组表Tx.getNextId(),
      ownerId,
      parentGroupId: data.parentGroupId,
    });

    txs.项目组表Tx.addRecord(record);

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

    const projectGroups = await api.projectGroups.getProjectGroups();
    this.table.initializeRecords(
      projectGroups.map((projectGroup) =>
        ClientProjectGroupModel.createFromRecord({
          id: projectGroup.id,
          name: projectGroup.name,
          ownerId: projectGroup.ownerId,
          parentGroupId: projectGroup.parentGroupId,
          createdAt: new Date(projectGroup.createdAt),
          updatedAt: new Date(projectGroup.updatedAt),
        }),
      ),
    );
  }
}
