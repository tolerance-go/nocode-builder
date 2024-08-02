import { BluemapProjectModelRecord } from '@/_gen/model-records';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { api } from '@/globals';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { TableName } from '@unocode/common';
import { 用户表模块 } from '../用户表模块';

export class ClientBluemapProjectModel extends BluemapProjectModelRecord {
  // 静态方法: 从 BluemapProjectModelRecord 实例创建 ClientBluemapProjectModel 实例
  static createFromRecord(
    record: BluemapProjectModelRecord,
  ): ClientBluemapProjectModel {
    const instance = new ClientBluemapProjectModel({
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

export class 蓝图项目详情表模块 extends ModuleBase {
  static tableName = TableName.BluemapProject;
  private static instance: 蓝图项目详情表模块;

  public static getInstance(engine: EngineBase): 蓝图项目详情表模块 {
    if (!蓝图项目详情表模块.instance) {
      蓝图项目详情表模块.instance = new 蓝图项目详情表模块(engine);
    }

    return 蓝图项目详情表模块.instance;
  }

  table: Table<ClientBluemapProjectModel>;

  constructor(engine: EngineBase) {
    super(engine);
    this.table = new Table<ClientBluemapProjectModel>();

    window.bluemapProjectTable = this.table;
  }

  addBluemapProject(): ClientBluemapProjectModel {
    const 用户表模块实例 = this.getDependModule(用户表模块);
    const ownerId = 用户表模块实例.loginUser.id;

    const record = new ClientBluemapProjectModel({
      id: this.table.getNextId(),
      ownerId,
    });

    this.table.addRecord(record);

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

    const bluemapProjects = await api.bluemapProjects.getBluemapProjects();
    this.table.initializeRecords(
      bluemapProjects.map((bluemapProject) =>
        ClientBluemapProjectModel.createFromRecord({
          id: bluemapProject.id,
          ownerId: bluemapProject.ownerId,
          createdAt: new Date(bluemapProject.createdAt),
          updatedAt: new Date(bluemapProject.updatedAt),
        }),
      ),
    );
  }
}
