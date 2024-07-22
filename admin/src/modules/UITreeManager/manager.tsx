import { ModuleBase } from '@/base';
import ReactDOM from 'react-dom/client';
import { UIStoreManager } from '../UIStoreManager';
import { 图标管理者 } from '../图标管理者';
import { 文档环境模块 } from '../文档环境模块';
import { 跟随鼠标显示内容管理者 } from '../跟随鼠标显示内容管理者';
import { 项目树历史纪录管理者 } from '../项目树历史纪录管理者';
import { 验证管理者 } from '../验证管理者';
import { renderRoot } from './renderRoot';
import { 全局事件系统 } from '../全局事件系统';
import { 界面导航系统 } from '../界面导航系统';
import { 界面通知系统 } from '../界面通知系统';

export class UITreeManager extends ModuleBase {
  requireModules() {
    const 全局界面通知系统实例 = (window.全局界面通知系统实例 =
      new 界面通知系统(this.engine));
    const 全局事件系统实例 = (window.全局事件系统实例 = new 全局事件系统(
      this.engine,
    ));
    const 全局界面导航系统实例 = (window.全局界面导航系统实例 =
      new 界面导航系统(this.engine));

    super.requireModules(
      new 项目树历史纪录管理者(),
      new 文档环境模块(document),
      全局界面通知系统实例,
      new 验证管理者(this.engine),
      new 图标管理者(this.engine),
      new 跟随鼠标显示内容管理者(this.engine),
      new UIStoreManager(this.engine),
      全局事件系统实例,
      全局界面导航系统实例,
    );
  }

  protected async onSetup() {
    this.getDependModule(全局事件系统).on('文档环境/pageLoadComplete', () => {
      ReactDOM.createRoot(document.getElementById('root')!).render(
        renderRoot(this),
      );
    });
  }
}
