import { UserModel } from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { api } from '@/globals';
import { 全局事件系统 } from '@/modules/全局事件系统';
import store from 'store2';

export class ClientUserModel extends UserModel {
  constructor({
    id,
    name,
    email,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    email?: string;
    createdAt: string;
    updatedAt: string;
  }) {
    super({
      id,
      name,
      email,
      password: '',
      projects: [],
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      projectGroups: [],
    });
  }
}

class UserModelTable extends ModuleBase {
  table: string;
  list: ClientUserModel[];
  token: string | null;

  constructor(engine: EngineBase) {
    super(engine);
    this.table = 'user_model';
    this.list = [];
    this.token = null;
  }

  public get currentUser(): ClientUserModel {
    if (this.list.length === 0) {
      throw new Error('用户未登录');
    }

    return this.list[0];
  }

  protected requireModules(): void {
    super.requireModules(this.engine.getModuleOrCreate(全局事件系统));
  }

  protected async onSetup(): Promise<void> {
    const token = store.get('token');
    if (token) {
      this.token = token;
      await this.getUserByToken();
    }

    this.getDependModule(全局事件系统).on(
      '界面视图管理者/用户登录成功',
      async ({ token }) => {
        store.set('token', token);
        await this.getUserByToken();
      },
    );
  }

  private async getUserByToken() {
    const user = await api.users.getUserByToken();
    this.list.push(
      new ClientUserModel({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }),
    );
  }
}

export { UserModelTable };
