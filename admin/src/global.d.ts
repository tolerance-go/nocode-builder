import { EngineBase } from './base';
import { EngineManagerBase } from './base/EngineManager';
import { 全局事件系统 } from '@/modules/全局事件系统';
import { 界面导航系统 } from '@/modules/界面导航系统';
import { 界面通知系统 } from '@/modules/界面通知系统';

declare global {
  interface Window {
    appEngine?: EngineBase;
    engineManager?: EngineManagerBase;
    全局界面通知系统实例?: 界面通知系统;
    全局事件系统实例?: 全局事件系统;
    全局界面导航系统实例?: 界面导航系统;
  }
}

export {};
