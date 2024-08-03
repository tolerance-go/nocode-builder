import { EngineBase } from './base';
import { EngineManagerBase } from './base/EngineManager';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { 界面导航系统 } from '@/modules/ui/界面导航系统';
import { 界面通知系统 } from '@/modules/界面通知系统';
import { Table } from './common/controllers';

declare global {
  interface Window {
    appEngine?: EngineBase;
    appEngineManager?: EngineManagerBase;
    全局界面通知系统实例?: 界面通知系统;
    全局事件系统实例?: 事件中心系统;
    全局界面导航系统实例?: 界面导航系统;
    projectTable?: Table;
    projectDetailTable?: Table;
    viewProjectTable?: Table;
    dataTableProjectTable?: Table;
    bluemapProjectTable?: Table;
    projectGroupTable?: Table;
  }
}

export {};
