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
  }

  public addProjectGroup(data: {
    id: number;
    name: string;
    parentGroupId?: number;
  }): void {
    const 用户表模块实例 = this.getDependModule(用户表模块);
    const ownerId = 用户表模块实例.loginUser.id;

    this.table.addRecord(
      new ClientProjectGroupModel({
        ...data,
        parentGroup: data.parentGroupId
          ? this.getDependModule(项目组表模块).table.findRecordOrThrow(
              data.parentGroupId,
            )
          : undefined,
        ownerId,
        owner:
          this.getDependModule(用户表模块).table.findRecordOrThrow(ownerId),
      }),
    );
  }

  protected requireModules(): void {
    super.requireModules(
      事件中心系统.getInstance(this.engine),
      用户表模块.getInstance(this.engine),
    );
  }

  protected async onSetup(): Promise<void> {}
}
