import { EngineBase, ModuleBase } from '@/base';
import ReactDOM from 'react-dom/client';
import { 事件中心系统 } from '../事件中心系统';
import { 图标管理者 } from '../图标管理者';
import { 文档环境模块 } from '../文档环境模块';
import { 界面导航系统 } from '../界面导航系统';
import { 界面状态仓库模块 } from '../界面状态仓库模块';
import { 界面通知系统 } from '../界面通知系统';
import { 跟随鼠标显示内容管理者 } from '../跟随鼠标显示内容管理者';
import { 项目树历史纪录管理者 } from '../项目树历史纪录管理者';
import { 验证管理者 } from '../验证管理者';
import { renderRoot } from './renderRoot';

export class 界面组件树管理模块 extends ModuleBase {
  private static instance: 界面组件树管理模块;

  public static getInstance(engine: EngineBase): 界面组件树管理模块 {
    if (!界面组件树管理模块.instance) {
      界面组件树管理模块.instance = new 界面组件树管理模块(engine);
    }

    return 界面组件树管理模块.instance;
  }

  requireModules() {
    super.requireModules(
      事件中心系统.getInstance(this.engine),
      界面导航系统.getInstance(this.engine),
      new 项目树历史纪录管理者(this.engine),
      new 文档环境模块(this.engine, document),
      界面通知系统.getInstance(this.engine),
      new 验证管理者(this.engine),
      new 图标管理者(this.engine),
      new 跟随鼠标显示内容管理者(this.engine),
      new 界面状态仓库模块(this.engine),
    );
  }

  protected async onSetup() {
    window.全局界面通知系统实例 = this.getDependModule(界面通知系统);
    window.全局事件系统实例 = this.getDependModule(事件中心系统);
    window.全局界面导航系统实例 = this.getDependModule(界面导航系统);

    this.getDependModule(事件中心系统).on('文档环境/pageLoadComplete', () => {
      ReactDOM.createRoot(document.getElementById('root')!).render(
        renderRoot(this),
      );
    });
  }
}
