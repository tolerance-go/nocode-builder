import { ModuleBase } from '@/base';
import ReactDOM from 'react-dom/client';
import { UIStoreManager } from '../界面状态管理器模块';
import { 图标管理者 } from '../图标管理者';
import { 文档环境模块 } from '../文档环境模块';
import { 跟随鼠标显示内容管理者 } from '../跟随鼠标显示内容管理者';
import { 项目树历史纪录管理者 } from '../项目树历史纪录管理者';
import { 验证管理者 } from '../验证管理者';
import { renderRoot } from './renderRoot';
import { 全局事件系统 } from '../全局事件系统';
import { 界面导航系统 } from '../界面导航系统';
import { 界面通知系统 } from '../界面通知系统';
import { 基础引擎 } from '@/engines/基础引擎';

export class 界面组件树管理模块 extends ModuleBase {
  requireModules() {
    const 全局事件系统实例 = this.engine.engineManager
      .getEngine(基础引擎)
      .getModuleOrCreate(全局事件系统);
    super.requireModules(
      全局事件系统实例,
      this.engine.getModuleOrCreate(界面导航系统),
      new 项目树历史纪录管理者(this.engine),
      new 文档环境模块(this.engine, document),
      this.engine.getModuleOrCreate(界面通知系统),
      new 验证管理者(this.engine),
      new 图标管理者(this.engine),
      new 跟随鼠标显示内容管理者(this.engine),
      new UIStoreManager(this.engine),
    );
  }

  protected async onSetup() {
    window.全局界面通知系统实例 = this.getDependModule(界面通知系统);
    window.全局事件系统实例 = this.getDependModule(全局事件系统);
    window.全局界面导航系统实例 = this.getDependModule(界面导航系统);

    this.getDependModule(全局事件系统).on('文档环境/pageLoadComplete', () => {
      ReactDOM.createRoot(document.getElementById('root')!).render(
        renderRoot(this),
      );
    });
  }
}
