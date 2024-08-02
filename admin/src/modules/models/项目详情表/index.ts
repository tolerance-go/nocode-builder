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
      viewProjectId: record.viewProjectId,
      dataTableProjectId: record.dataTableProjectId,
      bluemapProjectId: record.bluemapProjectId,
      ownerId: record.ownerId,
    });

    instance.createdAt = record.createdAt;
    instance.updatedAt = record.updatedAt;

    return instance;
  }

  constructor({
    id,
    ownerId,
    viewProjectId,
    dataTableProjectId,
    bluemapProjectId,
  }: {
    id: number;
    ownerId: number;
    viewProjectId: number | undefined;
    dataTableProjectId: number | undefined;
    bluemapProjectId: number | undefined;
  }) {
    super({
      id,
      ownerId,
      viewProjectId,
      dataTableProjectId,
      bluemapProjectId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export class 项目详情表模块 extends ModuleBase {
  static tableName = TableName.ProjectDetail;
  private static instance: 项目详情表模块;

  public static getInstance(engine: EngineBase): 项目详情表模块 {
    if (!项目详情表模块.instance) {
      项目详情表模块.instance = new 项目详情表模块(engine);
    }

    return 项目详情表模块.instance;
  }

  table: Table<ClientProjectDetailModel>;

  constructor(engine: EngineBase) {
    super(engine);
    this.table = new Table<ClientProjectDetailModel>();

    window.projectDetailTable = this.table;
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
          viewProjectId: projectDetail.viewProjectId,
          dataTableProjectId: projectDetail.dataTableProjectId,
          bluemapProjectId: projectDetail.bluemapProjectId,
          ownerId: projectDetail.ownerId,
          createdAt: new Date(projectDetail.createdAt),
          updatedAt: new Date(projectDetail.updatedAt),
        }),
      ),
    );
  }
}
