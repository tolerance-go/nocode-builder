import '@ungap/with-resolvers';
import 'normalize.css';
import { Engine } from './core/base';
import { 文档环境 } from './core/envs';
import {
  AppManager,
  UIStoreManager,
  UITreeManager,
  项目树历史纪录管理者,
} from './core/managers';
import { 图标管理者 } from './core/managers/图标管理者';
import { 跟随鼠标显示内容管理者 } from './core/managers/跟随鼠标显示内容管理者';
import { 验证管理者 } from './core/managers/验证管理者';
import { I18nSystem, 全局事件系统, 界面导航系统 } from './core/systems';
import { 全局界面通知系统实例 } from './globals';
import './index.css';

const 全局事件系统实例 = new 全局事件系统();
const 界面导航系统实例 = new 界面导航系统();

new Engine(
  new 文档环境(document).requires(全局事件系统实例),
  new AppManager(),
  new I18nSystem(),
  (engineApi) =>
    new 项目树历史纪录管理者(engineApi).requires(
      全局事件系统实例,
      全局界面通知系统实例,
    ),
  (engineApi) =>
    new UITreeManager().requires(
      全局界面通知系统实例,
      new 验证管理者(),
      new 图标管理者(),
      new 跟随鼠标显示内容管理者(),
      new UIStoreManager(engineApi).requires(
        全局事件系统实例,
        界面导航系统实例,
      ),
      全局事件系统实例,
      界面导航系统实例,
    ),
).launch();
