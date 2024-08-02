import { ProjectModelRecord } from '@/_gen/model-records';
import { ProjectTypeEnum } from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { 用户表模块 } from '../用户表模块';
import { TableName } from '@unocode/common';
import { api } from '@/globals';

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

  public removeProject(id: number): void {
    this.table.deleteRecord(id);
  }

  public moveProject(
    id: number,
    newProjectGroupId?: number,
  ): ClientProjectModel {
    const record = this.table.findRecordOrThrow(id);

    record.projectGroupId = newProjectGroupId;
    this.table.updateRecord(record);

    return record;
  }

  public updateProjectTitle(
    id: number,
    data: {
      name?: string;
    },
  ): ClientProjectModel {
    const record = this.table.findRecordOrThrow(id);

    if (data.name !== undefined) {
      record.name = data.name;
    }

    this.table.updateRecord(record);

    return record;
  }

  public addProject(data: {
    name: string;
    projectDetailId: number;
    projectGroupId?: number;
    type: ProjectTypeEnum;
  }): ClientProjectModel {
    const 用户表模块实例 = this.getDependModule(用户表模块);
    const ownerId = 用户表模块实例.loginUser.id;

    const record = new ClientProjectModel({
      ...data,
      id: this.table.getNextId(),
      ownerId,
      projectGroupId: data.projectGroupId,
      projectDetailId: data.projectDetailId,
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
