import { ModuleBase } from '@/base';
import { fullPathnames, pathItems } from '@/common/constants';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { 图标管理者 } from '@/modules/图标管理者';
import { 界面导航系统 } from '@/modules/ui/界面导航系统';
import { 界面状态仓库模块 } from '@/modules/ui/界面状态仓库模块';
import { 界面通知系统 } from '@/modules/ui/界面通知系统';
import { 跟随鼠标显示内容管理者 } from '@/modules/跟随鼠标显示内容管理者';
import { 验证管理者 } from '@/modules/验证管理者';
import {
  全局事件系统Context,
  图标管理者Context,
  导航系统Context,
  界面状态仓库模块Context,
  模块上下文,
  跟随鼠标显示内容管理者Context,
  验证管理者Context,
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
import { Custom } from './root/custom';
import { 部件组件管理模块 } from '../部件组件管理模块';

export const renderRoot = (module: ModuleBase) => {
  const 验证管理者实例 = module.getDependModule(验证管理者);
  const 图标管理者实例 = module.getDependModule(图标管理者);
  const 跟随鼠标显示内容管理者实例 =
    module.getDependModule(跟随鼠标显示内容管理者);
  const 界面状态管理者实例 = module.getDependModule(界面状态仓库模块);
  const 全局事件系统实例 = module.getDependModule(事件中心系统);
  const 导航系统实例 = module.getDependModule(界面导航系统);
  const 界面通知系统实例 = module.getDependModule(界面通知系统);
  const 部件组件管理模块实例 = module.getDependModule(部件组件管理模块);

  return (
    <React.StrictMode>
      <模块上下文.Provider
        value={{
          导航系统: 导航系统实例,
          全局事件系统: 全局事件系统实例,
          界面通知系统: 界面通知系统实例,
          部件组件管理模块: 部件组件管理模块实例,
        }}
      >
        <导航系统Context.Provider value={导航系统实例}>
          <全局事件系统Context.Provider value={全局事件系统实例}>
            <界面状态仓库模块Context.Provider value={界面状态管理者实例}>
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
                                path={pathItems['view-editor']}
                                element={<ViewEditor />}
                              ></Route>
                              <Route
                                path={pathItems['bluemap-editor']}
                                element={<BluemapEditor />}
                              ></Route>
                              <Route
                                path={pathItems['data-table-editor']}
                                element={<DataTableEditor />}
                              ></Route>
                            </Route>
                            <Route
                              path={pathItems['custom']}
                              element={<Custom />}
                            ></Route>
                            <Route element={<Auth />}>
                              <Route index element={<Login />}></Route>
                              <Route
                                path={pathItems.login}
                                element={<Login />}
                              ></Route>
                              <Route
                                path={pathItems.register}
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
            </界面状态仓库模块Context.Provider>
          </全局事件系统Context.Provider>
        </导航系统Context.Provider>
      </模块上下文.Provider>
    </React.StrictMode>
  );
};
