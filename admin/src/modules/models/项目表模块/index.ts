import { ProjectModelRecord } from '@/_gen/model-records';
import { ProjectTypeEnum, WidgetPlatformTypeEnum } from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { api } from '@/globals';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { TableTransactions } from '@/modules/后台数据管理模块';
import { TableName } from '@unocode/common';
import { 用户表模块 } from '../用户表模块';
import { 项目详情表模块 } from '../项目详情表';

export class ClientProjectModel extends ProjectModelRecord {
  // 静态方法: 从 ProjectModelRecord 实例创建 ClientProjectModel 实例
  static createFromRecord(record: ProjectModelRecord): ClientProjectModel {
    const instance = new ClientProjectModel({
      id: record.id,
      name: record.name,
      ownerId: record.ownerId,
      projectGroupId: record.projectGroupId,
      type: record.type,
      projectDetailId: record.projectDetailId,
    });

    instance.createdAt = record.createdAt;
    instance.updatedAt = record.updatedAt;

    return instance;
  }

  constructor({
    id,
    name,
    ownerId,
    projectGroupId,
    projectDetailId,
    type,
  }: {
    id: number;
    name: string;
    ownerId: number;
    projectGroupId: number | undefined;
    type: ProjectTypeEnum;
    projectDetailId: number;
  }) {
    super({
      id,
      name,
      ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
      projectGroupId,
      type,
      projectDetailId,
    });
  }
}

export class 项目表模块 extends ModuleBase {
  static tableName = TableName.Project;
  private static instance: 项目表模块;

  public static getInstance(engine: EngineBase): 项目表模块 {
    if (!项目表模块.instance) {
      项目表模块.instance = new 项目表模块(engine);
    }

    return 项目表模块.instance;
  }

  table: Table<ClientProjectModel>;

  constructor(engine: EngineBase) {
    super(engine);
    this.table = new Table<ClientProjectModel>();

    window.projectTable = this.table;
  }

  public removeProject(id: number, txs: TableTransactions): void {
    txs.项目组表Tx.deleteRecord(id);
  }

  public moveProject(
    id: number,
    newProjectGroupId: number | undefined,
    txs: TableTransactions,
  ): ClientProjectModel {
    const record = txs.项目表Tx.findRecordOrThrow(id);

    record.projectGroupId = newProjectGroupId;
    txs.项目表Tx.updateRecord(record);

    return record;
  }

  public updateProjectTitle(
    id: number,
    data: {
      name?: string;
    },
    txs: TableTransactions,
  ): ClientProjectModel {
    const record = txs.项目表Tx.findRecordOrThrow(id);

    if (data.name !== undefined) {
      record.name = data.name;
    }

    txs.项目表Tx.updateRecord(record);

    return record;
  }

  public addProject(
    {
      platformType,
      name,
      projectGroupId,
      type,
    }: {
      name: string;
      projectGroupId: number | undefined;
      type: ProjectTypeEnum;
      platformType: WidgetPlatformTypeEnum | undefined;
    },
    txs: TableTransactions,
  ): ClientProjectModel {
    const 用户表模块实例 = this.getDependModule(用户表模块);
    const ownerId = 用户表模块实例.loginUser.id;

    const projectDetail = this.getDependModule(项目详情表模块).addProjectDetail(
      {
        projectType: type,
        platformType,
      },
      txs,
    );

    const record = new ClientProjectModel({
      name,
      type,
      id: txs.项目表Tx.getNextId(),
      ownerId,
      projectGroupId,
      projectDetailId: projectDetail.id,
    });

    txs.项目表Tx.addRecord(record);

    return record;
  }

  protected requireModules(): void {
    super.requireModules(
      事件中心系统.getInstance(this.engine),
      用户表模块.getInstance(this.engine),
      项目详情表模块.getInstance(this.engine),
    );
  }

  protected async onSetup(): Promise<void> {
    if (!this.getDependModule(用户表模块).currentLoginUser) {
      return;
    }

    const projects = await api.projects.getProjects();
    this.table.initializeRecords(
      projects.map((project) =>
        ClientProjectModel.createFromRecord({
          id: project.id,
          projectDetailId: project.projectDetailId,
          name: project.name,
          ownerId: project.ownerId,
          projectGroupId: project.projectGroupId,
          type: this.toProjectTypeEnum(project.type),
          createdAt: new Date(project.createdAt),
          updatedAt: new Date(project.updatedAt),
        }),
      ),
    );
  }

  private toProjectTypeEnum(type: string): ProjectTypeEnum {
    if (type in ProjectTypeEnum) {
      return ProjectTypeEnum[type as keyof typeof ProjectTypeEnum];
    }

    throw new Error(`Unknown ProjectType: ${type}`);
  }
}
