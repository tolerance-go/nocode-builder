import { useContext } from 'react';
import {
  UIStoreManagerContext,
  图标管理者Context,
  跟随鼠标显示内容管理者Context,
  验证管理者Context,
} from './contexts';

export const use图标管理者 = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const 图标管理者 = useContext(图标管理者Context);
  if (!图标管理者) throw new Error('图标管理者未初始化');
  return 图标管理者;
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
  const UIStoreManager = useContext(UIStoreManagerContext);
  if (!UIStoreManager) throw new Error('UIStoreManager未初始化');
  return UIStoreManager;
};
