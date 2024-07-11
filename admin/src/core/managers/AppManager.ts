import { Manager } from '@/types';
import { DocumentEnv } from '../envs';
import { UITreeManager } from './UITreeManager';
import { UIStoreManager } from './UIStoreManager';
import { I18nSystem } from '../systems';
import { 跟随鼠标显示内容管理者 } from './跟随鼠标显示内容管理者';
import { 图标管理者 } from './图标管理者';
import { 验证管理者 } from './验证管理者';

export class AppManager implements Manager {
  private static instance: AppManager | undefined;

  private constructor() {}

  public static getInstance(): AppManager {
    if (!this.instance) {
      this.instance = new AppManager();
    }
    return this.instance;
  }

  work(document: Document) {
    const i18n系统单例 = I18nSystem.getInstance();
    const 文档环境实例 = DocumentEnv.getInstance().initialize(document);

    const 验证管理者单例 = 验证管理者.getInstance();
    const 跟随鼠标显示内容管理者单例 = 跟随鼠标显示内容管理者.getInstance();
    const 图标管理者单例 = 图标管理者.getInstance();
    const 界面状态管理者实例 = UIStoreManager.getInstance();

    验证管理者单例.work();
    跟随鼠标显示内容管理者单例.work();
    图标管理者单例.work();
    界面状态管理者实例.work();

    UITreeManager.getInstance().work(
      文档环境实例,
      验证管理者单例,
      图标管理者单例,
      跟随鼠标显示内容管理者单例,
      界面状态管理者实例,
    );

    i18n系统单例.launch();
    文档环境实例.activate();
  }
}
