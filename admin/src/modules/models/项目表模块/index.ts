import { ProjectModelRecord } from '@/_gen/model-records';
import { ProjectTypeEnum } from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { 用户表模块 } from '../用户表模块';
import { 项目组表模块 } from '../项目组表模块';

export class ClientProjectModel extends ProjectModelRecord {
  constructor({
    id,
    name,
    ownerId,
    projectGroupId,
    type,
  }: {
    id: number;
    name: string;
    ownerId: number;
    projectGroupId?: number;
    type: ProjectTypeEnum;
  }) {
    super({
      id,
      name,
      ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
      projectGroupId,
      type,
    });
  }
}

export class 项目表模块 extends ModuleBase {
  private static instance: 项目表模块;

  public static getInstance(engine: EngineBase): 项目表模块 {
    if (!项目表模块.instance) {
      项目表模块.instance = new 项目表模块(engine);
    }

    return 项目表模块.instance;
  }

  tableName: string;
  table: Table<ClientProjectModel>;

  constructor(engine: EngineBase) {
    super(engine);
    this.tableName = 'project_model';
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
    projectGroupId?: number;
    type: ProjectTypeEnum;
  }): ClientProjectModel {
    const 用户表模块实例 = this.getDependModule(用户表模块);
    const ownerId = 用户表模块实例.loginUser.id;

    const record = new ClientProjectModel({
      ...data,
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
      项目组表模块.getInstance(this.engine),
    );
  }

  protected async onSetup(): Promise<void> {}
}
