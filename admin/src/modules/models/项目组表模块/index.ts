import { ProjectGroupModel, UserModel } from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { 用户表模块 } from '../用户表模块';

export class ClientProjectGroupModel extends ProjectGroupModel {
  constructor({
    id,
    name,
    parentGroupId,
    parentGroup,
    ownerId,
    owner,
  }: {
    id: number;
    name: string;
    parentGroupId?: number;
    parentGroup?: ProjectGroupModel;
    ownerId: number;
    owner: UserModel;
  }) {
    super({
      id,
      name,
      parentGroupId,
      parentGroup,
      childGroups: [],
      ownerId,
      owner,
      projects: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export class 项目组表模块 extends ModuleBase {
  private static instance: 项目组表模块;

  public static getInstance(engine: EngineBase): 项目组表模块 {
    if (!项目组表模块.instance) {
      项目组表模块.instance = new 项目组表模块(engine);
    }

    return 项目组表模块.instance;
  }

  tableName: string;
  table: Table<ClientProjectGroupModel>;

  constructor(engine: EngineBase) {
    super(engine);
    this.tableName = 'project_group_model';
    this.table = new Table<ClientProjectGroupModel>();

    if (import.meta.env.DEV) {
      window.projectGroupTable = this.table;
    }
  }

  public removeProjectGroup(id: number): void {
    this.table.deleteRecord(id);
  }

  public moveProjectGroup(
    id: number,
    newParentGroupId?: number,
  ): ClientProjectGroupModel {
    const record = this.table.findRecordOrThrow(id);
    const newParentGroup = newParentGroupId
      ? this.table.findRecordOrThrow(newParentGroupId)
      : undefined;

    record.parentGroupId = newParentGroupId;
    record.parentGroup = newParentGroup;
    this.table.updateRecord(record);

    return record;
  }

  public updateProjectGroup(
    id: number,
    data: {
      name?: string;
    },
  ): ClientProjectGroupModel {
    const record = this.table.findRecordOrThrow(id);

    if (data.name !== undefined) {
      record.name = data.name;
    }

    this.table.updateRecord(record);

    return record;
  }

  public addProjectGroup(data: {
    name: string;
    parentGroupId?: number;
  }): ClientProjectGroupModel {
    const 用户表模块实例 = this.getDependModule(用户表模块);
    const ownerId = 用户表模块实例.loginUser.id;

    const record = new ClientProjectGroupModel({
      ...data,
      id: this.table.getNextId(),
      parentGroup: data.parentGroupId
        ? this.table.findRecordOrThrow(data.parentGroupId)
        : undefined,
      ownerId,
      owner: this.getDependModule(用户表模块).table.findRecordOrThrow(ownerId),
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

  protected async onSetup(): Promise<void> {}
}
