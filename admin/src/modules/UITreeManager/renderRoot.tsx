import { fullPathnames, paths } from '@/common/constants';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  系统上下文,
  导航系统Context,
  全局事件系统Context,
  UIStoreManagerContext,
  验证管理者Context,
  跟随鼠标显示内容管理者Context,
  图标管理者Context,
} from './contexts';
import { Root } from './root';
import { Admin } from './root/(admin)';
import { BluemapEditor } from './root/(admin)/Layout/内容区域组件/bluemap-editor';
import { DataTableEditor } from './root/(admin)/Layout/内容区域组件/data-table-editor';
import { ViewEditor } from './root/(admin)/Layout/内容区域组件/view-editor';
import { Auth } from './root/(auth)';
import { Login } from './root/(auth)/login';
import { Register } from './root/(auth)/register';
import { NotFound } from './root/404';
import { UIStoreManager } from '../UIStoreManager';
import { 全局事件系统 } from '../全局事件系统';
import { 图标管理者 } from '../图标管理者';
import { 界面导航系统 } from '../界面导航系统';
import { 界面通知系统 } from '../界面通知系统';
import { 跟随鼠标显示内容管理者 } from '../跟随鼠标显示内容管理者';
import { 验证管理者 } from '../验证管理者';
import { Module } from '@/base/types';

export const renderRoot = (module: Module) => {
  const 验证管理者实例 = module.getDependModule(验证管理者);
  const 图标管理者实例 = module.getDependModule(图标管理者);
  const 跟随鼠标显示内容管理者实例 =
    module.getDependModule(跟随鼠标显示内容管理者);
  const 界面状态管理者实例 = module.getDependModule(UIStoreManager);
  const 全局事件系统实例 = module.getDependModule(全局事件系统);
  const 导航系统实例 = module.getDependModule(界面导航系统);
  const 界面通知系统实例 = module.getDependModule(界面通知系统);

  return (
    <React.StrictMode>
      <系统上下文.Provider
        value={{
          导航系统: 导航系统实例,
          全局事件系统: 全局事件系统实例,
          界面通知系统: 界面通知系统实例,
        }}
      >
        <导航系统Context.Provider value={导航系统实例}>
          <全局事件系统Context.Provider value={全局事件系统实例}>
            <UIStoreManagerContext.Provider value={界面状态管理者实例}>
              <验证管理者Context.Provider value={验证管理者实例}>
                <跟随鼠标显示内容管理者Context.Provider
                  value={跟随鼠标显示内容管理者实例}
                >
                  <图标管理者Context.Provider value={图标管理者实例}>
                    <Provider store={界面状态管理者实例.store}>
                      <BrowserRouter
                        basename={import.meta.env.DEV ? '' : '/admin'}
                      >
                        <Routes>
                          <Route path={fullPathnames.root} element={<Root />}>
                            {/* <Route path="test" element={<Test />}></Route> */}
                            <Route index element={<Admin />}></Route>
                            <Route element={<Admin />}>
                              <Route
                                path={paths['view-editor']}
                                element={<ViewEditor />}
                              ></Route>
                              <Route
                                path={paths['bluemap-editor']}
                                element={<BluemapEditor />}
                              ></Route>
                              <Route
                                path={paths['data-table-editor']}
                                element={<DataTableEditor />}
                              ></Route>
                            </Route>
                            <Route element={<Auth />}>
                              <Route index element={<Login />}></Route>
                              <Route
                                path={paths.login}
                                element={<Login />}
                              ></Route>
                              <Route
                                path={paths.register}
                                element={<Register />}
                              ></Route>
                            </Route>
                            <Route path="*" element={<NotFound />} />
                          </Route>
                        </Routes>
                      </BrowserRouter>
                    </Provider>
                  </图标管理者Context.Provider>
                </跟随鼠标显示内容管理者Context.Provider>
              </验证管理者Context.Provider>
            </UIStoreManagerContext.Provider>
          </全局事件系统Context.Provider>
        </导航系统Context.Provider>
      </系统上下文.Provider>
    </React.StrictMode>
  );
};
