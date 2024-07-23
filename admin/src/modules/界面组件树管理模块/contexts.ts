import { 全局事件系统 } from '@/modules/全局事件系统';
import { createContext } from 'react';
import { UIStoreManager } from '../界面状态管理器模块';
import { 图标管理者 } from '../图标管理者';
import { 跟随鼠标显示内容管理者 } from '../跟随鼠标显示内容管理者';
import { 验证管理者 } from '../验证管理者';
import { 界面通知系统 } from '@/modules/界面通知系统';
import { 界面导航系统 } from '../界面导航系统';

export const 图标管理者Context = createContext<图标管理者 | null>(null);

export const 跟随鼠标显示内容管理者Context =
  createContext<跟随鼠标显示内容管理者 | null>(null);

export const 验证管理者Context = createContext<验证管理者 | null>(null);
export const UIStoreManagerContext = createContext<UIStoreManager | null>(null);
export const 全局事件系统Context = createContext<全局事件系统 | null>(null);
export const 导航系统Context = createContext<界面导航系统 | null>(null);

export const 系统上下文 = createContext<{
  导航系统: 界面导航系统;
  全局事件系统: 全局事件系统;
  界面通知系统: 界面通知系统;
} | null>(null);
