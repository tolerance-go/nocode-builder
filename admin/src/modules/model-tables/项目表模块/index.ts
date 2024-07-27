import {
  ProjectGroupModel,
  ProjectModel,
  ProjectTypeEnum,
  UserModel,
} from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { 事件中心系统 } from '@/modules/事件中心系统';

export class ClientProjectModel extends ProjectModel {
  constructor({
    id,
    name,
    ownerId,
    owner,
    createdAt,
    updatedAt,
    projectGroup,
    projectGroupId,
    type,
  }: {
    id: number;
    name: string;
    ownerId: number;
    owner: UserModel;
    createdAt: Date;
    updatedAt: Date;
    projectGroup?: ProjectGroupModel;
    projectGroupId?: number;
    type: ProjectTypeEnum;
  }) {
    super({
      id,
      name,
      ownerId,
      owner,
      createdAt,
      updatedAt,
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
  }

  protected requireModules(): void {
    super.requireModules(事件中心系统.getInstance(this.engine));
  }

  protected async onSetup(): Promise<void> {}
}
