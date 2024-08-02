import { ViewProjectModelRecord } from '@/_gen/model-records';
import { WidgetPlatformTypeEnum } from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { api } from '@/globals';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { TableName } from '@unocode/common';
import { 用户表模块 } from '../用户表模块';

export class ClientViewProjectModel extends ViewProjectModelRecord {
  // 静态方法: 从 ViewProjectModelRecord 实例创建 ClientViewProjectModel 实例
  static createFromRecord(
    record: ViewProjectModelRecord,
  ): ClientViewProjectModel {
    const instance = new ClientViewProjectModel({
      id: record.id,
      platformType: record.platformType,
      ownerId: record.ownerId,
    });

    instance.createdAt = record.createdAt;
    instance.updatedAt = record.updatedAt;

    return instance;
  }

  constructor({
    id,
    platformType,
    ownerId,
  }: {
    id: number;
    platformType: WidgetPlatformTypeEnum;
    ownerId: number;
  }) {
    super({
      id,
      platformType,
      ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export class 视图项目详情表模块 extends ModuleBase {
  static tableName = TableName.ViewProject;
  private static instance: 视图项目详情表模块;

  public static getInstance(engine: EngineBase): 视图项目详情表模块 {
    if (!视图项目详情表模块.instance) {
      视图项目详情表模块.instance = new 视图项目详情表模块(engine);
    }

    return 视图项目详情表模块.instance;
  }

  table: Table<ClientViewProjectModel>;

  constructor(engine: EngineBase) {
    super(engine);
    this.table = new Table<ClientViewProjectModel>();

    window.viewProjectTable = this.table;
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

    const viewProjects = await api.viewProjects.getViewProjects();
    this.table.initializeRecords(
      viewProjects.map((viewProject) =>
        ClientViewProjectModel.createFromRecord({
          id: viewProject.id,
          ownerId: viewProject.ownerId,
          platformType: this.toWidgetPlatformTypeEnum(viewProject.platformType),
          createdAt: new Date(viewProject.createdAt),
          updatedAt: new Date(viewProject.updatedAt),
        }),
      ),
    );
  }

  private toWidgetPlatformTypeEnum(type: string): WidgetPlatformTypeEnum {
    if (type in WidgetPlatformTypeEnum) {
      return WidgetPlatformTypeEnum[
        type as keyof typeof WidgetPlatformTypeEnum
      ];
    }

    throw new Error(`Unknown WidgetPlatformTypeEnum: ${type}`);
  }
}
