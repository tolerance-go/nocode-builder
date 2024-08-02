import { ProjectDetailModelRecord } from '@/_gen/model-records';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { 用户表模块 } from '../用户表模块';
import { TableName } from '@unocode/common';
import { api } from '@/globals';

export class ClientProjectDetailModel extends ProjectDetailModelRecord {
  // 静态方法: 从 ProjectDetailModelRecord 实例创建 ClientProjectDetailModel 实例
  static createFromRecord(
    record: ProjectDetailModelRecord,
  ): ClientProjectDetailModel {
    const instance = new ClientProjectDetailModel({
      id: record.id,
      name: record.name,
      ownerId: record.ownerId,
      projectDetailGroupId: record.projectDetailGroupId,
      type: record.type,
      projectDetailDetailId: record.projectDetailDetailId,
    });

    instance.createdAt = record.createdAt;
    instance.updatedAt = record.updatedAt;

    return instance;
  }

  constructor({
    id,
    name,
    ownerId,
    projectDetailGroupId,
    projectDetailDetailId,
    type,
  }: {
    id: number;
    name: string;
    ownerId: number;
    projectDetailGroupId: number | undefined;
    type: ProjectDetailTypeEnum;
    projectDetailDetailId: number;
  }) {
    super({
      id,
      name,
      ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
      projectDetailGroupId,
      type,
      projectDetailDetailId,
    });
  }
}

export class 项目表模块 extends ModuleBase {
  static tableName = TableName.ProjectDetail;
  private static instance: 项目表模块;

  public static getInstance(engine: EngineBase): 项目表模块 {
    if (!项目表模块.instance) {
      项目表模块.instance = new 项目表模块(engine);
    }

    return 项目表模块.instance;
  }

  table: Table<ClientProjectDetailModel>;

  constructor(engine: EngineBase) {
    super(engine);
    this.table = new Table<ClientProjectDetailModel>();

    window.projectDetailTable = this.table;
  }

  public removeProjectDetail(id: number): void {
    this.table.deleteRecord(id);
  }

  public moveProjectDetail(
    id: number,
    newProjectDetailGroupId?: number,
  ): ClientProjectDetailModel {
    const record = this.table.findRecordOrThrow(id);

    record.projectDetailGroupId = newProjectDetailGroupId;
    this.table.updateRecord(record);

    return record;
  }

  public updateProjectDetailTitle(
    id: number,
    data: {
      name?: string;
    },
  ): ClientProjectDetailModel {
    const record = this.table.findRecordOrThrow(id);

    if (data.name !== undefined) {
      record.name = data.name;
    }

    this.table.updateRecord(record);

    return record;
  }

  public addProjectDetail(data: {
    name: string;
    projectDetailDetailId: number;
    projectDetailGroupId?: number;
    type: ProjectDetailTypeEnum;
  }): ClientProjectDetailModel {
    const 用户表模块实例 = this.getDependModule(用户表模块);
    const ownerId = 用户表模块实例.loginUser.id;

    const record = new ClientProjectDetailModel({
      ...data,
      id: this.table.getNextId(),
      ownerId,
      projectDetailGroupId: data.projectDetailGroupId,
      projectDetailDetailId: data.projectDetailDetailId,
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

    const projectDetails = await api.projectDetails.getProjectDetails();
    this.table.initializeRecords(
      projectDetails.map((projectDetail) =>
        ClientProjectDetailModel.createFromRecord({
          id: projectDetail.id,
          projectDetailDetailId: projectDetail.projectDetailDetailId,
          name: projectDetail.name,
          ownerId: projectDetail.ownerId,
          projectDetailGroupId: projectDetail.projectDetailGroupId,
          type: this.toProjectDetailTypeEnum(projectDetail.type),
          createdAt: new Date(projectDetail.createdAt),
          updatedAt: new Date(projectDetail.updatedAt),
        }),
      ),
    );
  }

  private toProjectDetailTypeEnum(type: string): ProjectDetailTypeEnum {
    if (type in ProjectDetailTypeEnum) {
      return ProjectDetailTypeEnum[type as keyof typeof ProjectDetailTypeEnum];
    }

    throw new Error(`Unknown ProjectDetailType: ${type}`);
  }
}
