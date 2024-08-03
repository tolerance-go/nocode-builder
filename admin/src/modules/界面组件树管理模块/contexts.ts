import { 事件中心系统 } from '@/modules/事件中心系统';
import { createContext } from 'react';
import { 界面状态仓库模块 } from '../界面状态仓库模块';
import { 图标管理者 } from '../图标管理者';
import { 跟随鼠标显示内容管理者 } from '../跟随鼠标显示内容管理者';
import { 验证管理者 } from '../验证管理者';
import { 界面通知系统 } from '@/modules/界面通知系统';
import { 界面导航系统 } from '../ui/界面导航系统';

export const 图标管理者Context = createContext<图标管理者 | null>(null);

export const 跟随鼠标显示内容管理者Context =
  createContext<跟随鼠标显示内容管理者 | null>(null);

export const 验证管理者Context = createContext<验证管理者 | null>(null);
export const 界面状态仓库模块Context = createContext<界面状态仓库模块 | null>(
  null,
);
export const 全局事件系统Context = createContext<事件中心系统 | null>(null);
export const 导航系统Context = createContext<界面导航系统 | null>(null);

export const 系统上下文 = createContext<{
  导航系统: 界面导航系统;
  全局事件系统: 事件中心系统;
  界面通知系统: 界面通知系统;
} | null>(null);
