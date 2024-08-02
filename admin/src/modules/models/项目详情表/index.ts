import { ProjectDetailModelRecord } from '@/_gen/model-records';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { 用户表模块 } from '../用户表模块';
import { TableName } from '@unocode/common';
import { api } from '@/globals';
import { ProjectTypeEnum, WidgetPlatformTypeEnum } from '@/_gen/models';
import { 视图项目详情表模块 } from '../视图项目详情表';
import { 蓝图项目详情表模块 } from '../蓝图项目详情表';
import { 数据表项目详情表模块 } from '../数据表项目详情表';
import { TableTransactions } from '@/modules/后台数据管理模块';

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

  public addProjectDetail(
    {
      projectType,
      platformType,
    }: {
      projectType: ProjectTypeEnum;
      platformType: WidgetPlatformTypeEnum | undefined;
    },
    txs: TableTransactions,
  ): ClientProjectDetailModel {
    const 用户表模块实例 = this.getDependModule(用户表模块);
    const ownerId = 用户表模块实例.loginUser.id;

    let viewProject;
    if (projectType === ProjectTypeEnum.View) {
      if (!platformType) {
        throw new Error('platformType 不能为空');
      }

      viewProject = this.getDependModule(视图项目详情表模块).addViewProject({
        platformType,
      });
    }

    let blueMapProject;
    if (projectType === ProjectTypeEnum.Bluemap) {
      blueMapProject =
        this.getDependModule(蓝图项目详情表模块).addBluemapProject();
    }

    let dataTableProject;
    if (projectType === ProjectTypeEnum.DataTable) {
      dataTableProject =
        this.getDependModule(数据表项目详情表模块).addDataTableProject();
    }

    const record = new ClientProjectDetailModel({
      id: txs.项目详情表Tx.getNextId(),
      ownerId,
      viewProjectId: viewProject?.id,
      bluemapProjectId: blueMapProject?.id,
      dataTableProjectId: dataTableProject?.id,
    });

    txs.项目详情表Tx.addRecord(record);

    return record;
  }

  protected requireModules(): void {
    super.requireModules(
      事件中心系统.getInstance(this.engine),
      用户表模块.getInstance(this.engine),
      视图项目详情表模块.getInstance(this.engine),
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
