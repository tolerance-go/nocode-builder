import { useContext } from 'react';
import {
  界面状态仓库模块Context,
  全局事件系统Context,
  界面图标管理者Context,
  导航系统Context,
  模块上下文,
  跟随鼠标显示内容管理者Context,
  验证管理者Context,
} from './contexts';

export const use界面图标管理者 = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const 界面图标管理者 = useContext(界面图标管理者Context);
  if (!界面图标管理者) throw new Error('界面图标管理者未初始化');
  return 界面图标管理者;
};

export const use跟随鼠标显示内容管理者 = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const 跟随鼠标显示内容管理者 = useContext(跟随鼠标显示内容管理者Context);
  if (!跟随鼠标显示内容管理者)
    throw new Error('跟随鼠标显示内容管理者未初始化');
  return 跟随鼠标显示内容管理者;
};

export const use验证管理者 = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const 验证管理者 = useContext(验证管理者Context);
  if (!验证管理者) throw new Error('验证管理者未初始化');
  return 验证管理者;
};

export const use界面状态管理者 = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const 界面状态仓库模块 = useContext(界面状态仓库模块Context);
  if (!界面状态仓库模块) throw new Error('界面状态仓库模块未初始化');
  return 界面状态仓库模块;
};
export const use全局事件系统 = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const 全局事件系统 = useContext(全局事件系统Context);
  if (!全局事件系统) throw new Error('全局事件系统未初始化');
  return 全局事件系统;
};

export const use导航系统 = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const 导航系统 = useContext(导航系统Context);
  if (!导航系统) throw new Error('导航系统未初始化');
  return 导航系统;
};

export const 获取模块上下文 = () => {
  const 上下文对象 = useContext(模块上下文);
  if (!上下文对象) throw new Error('系统上下文未初始化');
  return 上下文对象;
};
