import { EngineBase, ModuleBase } from '@/base';
import ReactDOM from 'react-dom/client';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { 界面界面图标管理者 } from '@/modules/界面图标管理者';
import { 文档环境对象代理模块 } from '@/modules/simulations/文档环境对象代理模块';
import { 界面导航系统 } from '@/modules/ui/界面导航系统';
import { 界面通知系统 } from '@/modules/ui/界面通知系统';
import { 跟随鼠标显示内容管理者 } from '@/modules/跟随鼠标显示内容管理者';
import { 项目树历史纪录管理者 } from '@/modules/项目树历史纪录管理者';
import { 验证管理者 } from '@/modules/验证管理者';
import { renderRoot } from './renderRoot';
import { 界面状态仓库模块 } from '@/modules/ui/界面状态仓库模块';
import { 部件组件管理模块 } from '../部件组件管理模块';

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
      项目树历史纪录管理者.getInstance(this.engine),
      文档环境对象代理模块.getInstance(this.engine, document),
      界面通知系统.getInstance(this.engine),
      验证管理者.getInstance(this.engine),
      界面界面图标管理者.getInstance(this.engine),
      跟随鼠标显示内容管理者.getInstance(this.engine),
      界面状态仓库模块.getInstance(this.engine),
      部件组件管理模块.getInstance(this.engine),
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

export * from './types';
