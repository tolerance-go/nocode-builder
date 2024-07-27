import {
  ProjectGroupModel,
  ProjectModel,
  ProjectTypeEnum,
  UserModel,
} from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { 浏览器代理模块 } from '@/modules/simulations/浏览器代理模块';
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

export class ProjectModelTableTableModule extends ModuleBase {
  private static instance: ProjectModelTableTableModule;

  public static getInstance(engine: EngineBase): ProjectModelTableTableModule {
    if (!ProjectModelTableTableModule.instance) {
      ProjectModelTableTableModule.instance = new ProjectModelTableTableModule(
        engine,
      );
    }

    return ProjectModelTableTableModule.instance;
  }

  tableName: string;
  table: Table<ClientProjectModel>;

  constructor(engine: EngineBase) {
    super(engine);
    this.tableName = 'project_model';
    this.table = new Table<ClientProjectModel>();
  }

  protected requireModules(): void {
    super.requireModules(
      事件中心系统.getInstance(this.engine),
      浏览器代理模块.getInstance(this.engine),
    );
  }

  protected async onSetup(): Promise<void> {}
}
