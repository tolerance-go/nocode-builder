import { Manager } from '@/types';
import { DocumentEnv } from '../envs';
import { UITreeManager } from './UITreeManager';
import { RootState, UIStoreManager } from './UIStoreManager';
import { I18nSystem, 界面导航系统 } from '../systems';
import { 跟随鼠标显示内容管理者 } from './跟随鼠标显示内容管理者';
import { 图标管理者 } from './图标管理者';
import { 验证管理者 } from './验证管理者';
import { 项目树历史纪录管理者 } from './项目树历史纪录管理者';
import { 全局事件系统 } from '../systems/全局事件系统';
import localforage from 'localforage';
import { localStateFieldName } from './UIStoreManager/configs';
import { 界面通知系统 } from '../systems/界面通知系统';

export class AppManager implements Manager {
  private working: boolean = false;
  isWorking(): boolean {
    return this.working;
  }

  document: Document;

  public 界面通知系统实例: 界面通知系统;

  public constructor(document: Document, 界面通知系统实例: 界面通知系统) {
    this.document = document;
    this.界面通知系统实例 = 界面通知系统实例;
  }

  async work() {
    this.working = true;
    const localState =
      await localforage.getItem<RootState>(localStateFieldName);

    const 全局事件系统实例 = new 全局事件系统();
    const 界面导航系统实例 = new 界面导航系统();
    const i18n系统单例 = new I18nSystem();
    const 文档环境实例 = new DocumentEnv(this.document);

    const 验证管理者单例 = new 验证管理者();
    const 跟随鼠标显示内容管理者单例 = new 跟随鼠标显示内容管理者();
    const 图标管理者单例 = new 图标管理者();
    const 界面状态管理者实例 = new UIStoreManager(
      全局事件系统实例,
      界面导航系统实例,
      localState,
    );
    const 项目树历史纪录管理者实例 = new 项目树历史纪录管理者(
      全局事件系统实例,
      this.界面通知系统实例,
    );
    const UITreeManager实例 = new UITreeManager(this.界面通知系统实例);

    await Promise.all([
      验证管理者单例.work(),
      跟随鼠标显示内容管理者单例.work(),
      图标管理者单例.work(),
      界面状态管理者实例.work(),
      项目树历史纪录管理者实例.work(),
      UITreeManager实例.work(
        文档环境实例,
        验证管理者单例,
        图标管理者单例,
        跟随鼠标显示内容管理者单例,
        界面状态管理者实例,
        全局事件系统实例,
        界面导航系统实例,
      ),
    ]);

    await Promise.all([
      i18n系统单例.launch(),
      全局事件系统实例.launch(),
      this.界面通知系统实例.launch(),
      界面导航系统实例.launch(),
      文档环境实例.activate(),
    ]);
  }
}
