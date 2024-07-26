import { UserModel } from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { api } from '@/globals';
import { 浏览器代理模块 } from '@/modules/simulations/浏览器代理模块';
import { 事件中心系统 } from '@/modules/事件中心系统';
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
  private static instance: UserModelTable;

  public static getInstance(engine: EngineBase): UserModelTable {
    if (!UserModelTable.instance) {
      UserModelTable.instance = new UserModelTable(engine);
    }

    return UserModelTable.instance;
  }

  table: string;
  list: ClientUserModel[];
  token: string | null;
  tokenFieldName: string;

  constructor(engine: EngineBase) {
    super(engine);
    this.table = 'user_model';
    this.list = [];
    this.token = null;
    this.tokenFieldName = 'token';
  }

  public get loginUser(): ClientUserModel | undefined {
    return this.list[0];
  }

  protected requireModules(): void {
    super.requireModules(
      事件中心系统.getInstance(this.engine),
      浏览器代理模块.getInstance(this.engine),
    );
  }

  protected async onSetup(): Promise<void> {
    this.监听视图用户登出();

    if (!this.getDependModule(浏览器代理模块).pathnameIsAuth()) {
      const token = store.get('token');
      if (token) {
        this.token = token;
        await this.getUserByToken();
      }
    }

    this.getDependModule(事件中心系统).on(
      '界面视图管理者/用户登录成功',
      async ({ token }) => {
        store.set('token', token);
        await this.getUserByToken();
      },
    );
  }

  private async getUserByToken() {
    const user = await api.users.getUserByToken();
    const userInfo = new ClientUserModel({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    this.list.push(userInfo);
    this.getDependModule(事件中心系统).emit('用户模型表/获取登录用户信息成功', {
      userInfo,
    });
  }

  private 监听视图用户登出() {
    this.getDependModule(事件中心系统).on(
      '界面视图管理者/用户登出成功',
      async () => {
        this.token = null;
        this.list = [];
        store.remove(this.tokenFieldName);

        this.getDependModule(事件中心系统).emit(
          '用户模型表/登录用户信息清理成功',
          undefined,
        );
      },
    );
  }
}

export { UserModelTable };
