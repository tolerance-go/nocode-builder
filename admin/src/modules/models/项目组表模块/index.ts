import { ProjectGroupModel, ProjectModel, UserModel } from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { 事件中心系统 } from '@/modules/事件中心系统';

export class ClientProjectGroupModel extends ProjectGroupModel {
  constructor({
    id,
    name,
    parentGroupId,
    parentGroup,
    childGroups,
    ownerId,
    owner,
    projects,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    parentGroupId?: number;
    parentGroup?: ProjectGroupModel;
    childGroups: ProjectGroupModel[];
    ownerId: number;
    owner: UserModel;
    projects: ProjectModel[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    super({
      id,
      name,
      parentGroupId,
      parentGroup,
      childGroups,
      ownerId,
      owner,
      projects,
      createdAt,
      updatedAt,
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

  protected requireModules(): void {
    super.requireModules(事件中心系统.getInstance(this.engine));
  }

  protected async onSetup(): Promise<void> {}
}
