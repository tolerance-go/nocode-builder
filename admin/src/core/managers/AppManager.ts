import localforage from 'localforage';
import { ManagerBase } from '../base';
import { 文档环境 } from '../envs';
import { I18nSystem, 界面导航系统 } from '../systems';
import { 全局事件系统 } from '../systems/全局事件系统';
import { 界面通知系统 } from '../systems/界面通知系统';
import { RootState, UIStoreManager } from './UIStoreManager';
import { localStateFieldName } from './UIStoreManager/configs';
import { UITreeManager } from './UITreeManager';
import { 图标管理者 } from './图标管理者';
import { 跟随鼠标显示内容管理者 } from './跟随鼠标显示内容管理者';
import { 项目树历史纪录管理者 } from './项目树历史纪录管理者';
import { 验证管理者 } from './验证管理者';

export class AppManager extends ManagerBase {
  document: Document;

  requires(界面通知系统实例: 界面通知系统): this {
    return super.requires(界面通知系统实例);
  }

  public constructor(document: Document) {
    super();
    this.document = document;
  }

  protected async onStart(): Promise<void> {
    const localState =
      await localforage.getItem<RootState>(localStateFieldName);

    const 全局事件系统实例 = new 全局事件系统();
    const 界面导航系统实例 = new 界面导航系统();
    const 文档环境实例 = new 文档环境(this.document).requires(全局事件系统实例);
    const 验证管理者单例 = new 验证管理者();
    const 跟随鼠标显示内容管理者单例 = new 跟随鼠标显示内容管理者();
    const 图标管理者单例 = new 图标管理者();
    const 界面状态管理者实例 = new UIStoreManager(localState).requires(
      全局事件系统实例,
      界面导航系统实例,
    );

    [
      文档环境实例,
      new I18nSystem(),
      全局事件系统实例,
      界面导航系统实例,
      验证管理者单例,
      跟随鼠标显示内容管理者单例,
      图标管理者单例,
      界面状态管理者实例,
      new 项目树历史纪录管理者().requires(
        全局事件系统实例,
        this.requireActor(界面通知系统),
      ),
      new UITreeManager().requires(
        this.requireActor(界面通知系统),
        验证管理者单例,
        图标管理者单例,
        跟随鼠标显示内容管理者单例,
        界面状态管理者实例,
        全局事件系统实例,
        界面导航系统实例,
      ),
    ].forEach((actor) => actor.start());
  }
}
