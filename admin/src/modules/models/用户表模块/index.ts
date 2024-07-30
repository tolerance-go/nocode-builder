import { UserModelRecord } from '@/_gen/model-records';
import { EngineBase, ModuleBase } from '@/base';
import { Table } from '@/common/controllers';
import { api } from '@/globals';
import { 浏览器代理模块 } from '@/modules/simulations/浏览器代理模块';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { TableName } from '@unocode/common';
import store from 'store2';

export class ClientUserModel extends UserModelRecord {
  constructor({
    id,
    name,
    email,
  }: {
    id: number;
    name: string;
    email?: string;
  }) {
    super({
      id,
      name,
      email,
      password: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export class 用户表模块 extends ModuleBase {
  static tableName = TableName.User;
  private static instance: 用户表模块;

  public static getInstance(engine: EngineBase): 用户表模块 {
    if (!用户表模块.instance) {
      用户表模块.instance = new 用户表模块(engine);
    }

    return 用户表模块.instance;
  }

  table: Table<UserModelRecord>;
  token: string | null;
  tokenFieldName: string;

  constructor(engine: EngineBase) {
    super(engine);
    this.table = new Table<UserModelRecord>();
    this.token = null;
    this.tokenFieldName = 'token';

    this.getDependModule(事件中心系统).on(
      '界面视图管理者/用户登录成功',
      async ({ token }) => {
        store.set('token', token);
        await this.getUserByToken();
      },
    );
  }

  public get currentLoginUser(): UserModelRecord | undefined {
    return this.table.findRecordByIndex(0);
  }

  public get loginUser(): UserModelRecord {
    if (!this.currentLoginUser) {
      throw new Error('未登录');
    }
    return this.currentLoginUser;
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
  }

  private async getUserByToken() {
    const user = await api.users.getUserByToken();
    const userInfo = new ClientUserModel({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    this.table.addRecord(userInfo);
    this.getDependModule(事件中心系统).emit('用户模型表/获取登录用户信息成功', {
      userInfo,
    });
  }

  private 监听视图用户登出() {
    this.getDependModule(事件中心系统).on(
      '界面视图管理者/用户登出成功',
      async () => {
        this.token = null;
        this.table.clearRecords();
        store.remove(this.tokenFieldName);

        this.getDependModule(事件中心系统).emit(
          '用户模型表/登录用户信息清理成功',
          undefined,
        );
      },
    );
  }
}
