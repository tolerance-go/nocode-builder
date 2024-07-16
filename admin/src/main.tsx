import localforage from 'localforage';
import 'normalize.css';
import { 文档环境 } from './core/envs';
import {
  AppManager,
  RootState,
  UIStoreManager,
  UITreeManager,
  项目树历史纪录管理者,
} from './core/managers';
import { localStateFieldName } from './core/managers/UIStoreManager/configs';
import { 图标管理者 } from './core/managers/图标管理者';
import { 跟随鼠标显示内容管理者 } from './core/managers/跟随鼠标显示内容管理者';
import { 验证管理者 } from './core/managers/验证管理者';
import { I18nSystem, 全局事件系统, 界面导航系统 } from './core/systems';
import { 界面通知系统 } from './core/systems/界面通知系统';
import './index.css';

const localState = await localforage.getItem<RootState>(localStateFieldName);

const 界面通知系统实例 = new 界面通知系统();
const 全局事件系统实例 = new 全局事件系统();
const 界面导航系统实例 = new 界面导航系统();
const 文档环境实例 = new 文档环境(document).requires(全局事件系统实例);
const 验证管理者实例 = new 验证管理者();
const 跟随鼠标显示内容管理者实例 = new 跟随鼠标显示内容管理者();
const 图标管理者实例 = new 图标管理者();
const 界面状态管理者实例 = new UIStoreManager(localState).requires(
  全局事件系统实例,
  界面导航系统实例,
);

const actors = [
  new AppManager(),
  文档环境实例,
  new I18nSystem(),
  全局事件系统实例,
  界面导航系统实例,
  验证管理者实例,
  跟随鼠标显示内容管理者实例,
  图标管理者实例,
  界面状态管理者实例,
  new 项目树历史纪录管理者().requires(全局事件系统实例, 界面通知系统实例),
  new UITreeManager().requires(
    界面通知系统实例,
    验证管理者实例,
    图标管理者实例,
    跟随鼠标显示内容管理者实例,
    界面状态管理者实例,
    全局事件系统实例,
    界面导航系统实例,
  ),
];

await Promise.all(actors.map((actor) => actor.setup()));
await Promise.all(actors.map((actor) => actor.start()));
