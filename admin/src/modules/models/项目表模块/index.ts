import {
  ProjectGroupModel,
  ProjectModel,
  ProjectTypeEnum,
  UserModel,
} from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { 用户表模块 } from '../用户表模块';
import { 项目组表模块 } from '../项目组表模块';

export class ClientProjectModel extends ProjectModel {
  constructor({
    id,
    name,
    ownerId,
    owner,
    projectGroup,
    projectGroupId,
    type,
  }: {
    id: number;
    name: string;
    ownerId: number;
    owner: UserModel;
    projectGroup?: ProjectGroupModel;
    projectGroupId?: number;
    type: ProjectTypeEnum;
  }) {
    super({
      id,
      name,
      ownerId,
      owner,
      createdAt: new Date(),
      updatedAt: new Date(),
      projectGroup,
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

    if (import.meta.env.DEV) {
      window.projectTable = this.table;
    }
  }

  public addProject(data: {
    id: number;
    name: string;
    projectGroupId?: number;
    type: ProjectTypeEnum;
  }): void {
    const 用户表模块实例 = this.getDependModule(用户表模块);
    const ownerId = 用户表模块实例.loginUser.id;

    this.table.addRecord(
      new ClientProjectModel({
        ...data,
        projectGroup: data.projectGroupId
          ? this.getDependModule(项目组表模块).table.findRecordOrThrow(
              data.projectGroupId,
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
      项目组表模块.getInstance(this.engine),
    );
  }

  protected async onSetup(): Promise<void> {}
}
