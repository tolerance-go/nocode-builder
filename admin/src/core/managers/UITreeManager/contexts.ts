import { 全局事件系统, 导航系统 } from '@/core/systems';
import { createContext } from 'react';
import { UIStoreManager } from '../UIStoreManager';
import { 图标管理者 } from '../图标管理者';
import { 跟随鼠标显示内容管理者 } from '../跟随鼠标显示内容管理者';
import { 验证管理者 } from '../验证管理者';

export const 图标管理者Context = createContext<图标管理者 | null>(null);

export const 跟随鼠标显示内容管理者Context =
  createContext<跟随鼠标显示内容管理者 | null>(null);

export const 验证管理者Context = createContext<验证管理者 | null>(null);
export const UIStoreManagerContext = createContext<UIStoreManager | null>(null);
export const 全局事件系统Context = createContext<全局事件系统 | null>(null);
export const 导航系统Context = createContext<导航系统 | null>(null);
