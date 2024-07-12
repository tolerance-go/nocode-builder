import { Manager } from '@/types';
import { DocumentEnv } from '../envs';
import { UITreeManager } from './UITreeManager';
import { UIStoreManager } from './UIStoreManager';
import { I18nSystem } from '../systems';
import { 跟随鼠标显示内容管理者 } from './跟随鼠标显示内容管理者';
import { 图标管理者 } from './图标管理者';
import { 验证管理者 } from './验证管理者';
import { 项目树历史纪录管理者 } from './项目树历史纪录管理者';

export class AppManager implements Manager {
  document: Document;

  public constructor(document: Document) {
    this.document = document;
  }

  async work() {
    const i18n系统单例 = new I18nSystem();
    const 文档环境实例 = new DocumentEnv(this.document);

    const 验证管理者单例 = new 验证管理者();
    const 跟随鼠标显示内容管理者单例 = new 跟随鼠标显示内容管理者();
    const 图标管理者单例 = new 图标管理者();
    const 界面状态管理者实例 = new UIStoreManager();
    const 项目树历史纪录管理者实例 = new 项目树历史纪录管理者();
    const UITreeManager实例 = new UITreeManager();

    await Promise.all([
      验证管理者单例.work(),
      跟随鼠标显示内容管理者单例.work(),
      图标管理者单例.work(),
      界面状态管理者实例.work(),
      项目树历史纪录管理者实例.work(界面状态管理者实例),
      UITreeManager实例.work(
        文档环境实例,
        验证管理者单例,
        图标管理者单例,
        跟随鼠标显示内容管理者单例,
        界面状态管理者实例,
      ),
      i18n系统单例.launch(),
      文档环境实例.activate(),
    ]);
  }
}
