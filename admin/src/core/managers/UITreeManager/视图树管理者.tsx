import { paths } from '@/configs';
import { Manager } from '@/types';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { 图标管理者 } from '../图标管理者';
import { 跟随鼠标显示内容管理者 } from '../跟随鼠标显示内容管理者';
import {
  UIStoreManagerContext,
  全局事件系统Context,
  图标管理者Context,
  导航系统Context,
  系统上下文,
  跟随鼠标显示内容管理者Context,
  验证管理者Context,
} from './contexts';
import { Root } from './root';
import { Admin } from './root/(admin)';
import { Auth } from './root/(auth)';
import { Login } from './root/(auth)/login';
import { Register } from './root/(auth)/register';
import { NotFound } from './root/404';
import { 验证管理者 } from '../验证管理者';
import { DocumentEnv } from '@/core/envs';
import { UIStoreManager } from '../UIStoreManager';
import { 全局事件系统 } from '@/core/systems/全局事件系统';
import { ViewEditor } from './root/(admin)/Layout/内容区域组件/view-editor';
import { BluemapEditor } from './root/(admin)/Layout/内容区域组件/bluemap-editor';
import { DataTableEditor } from './root/(admin)/Layout/内容区域组件/data-table-editor';
import { 导航系统 } from '@/core/systems';
import { 界面通知系统 } from '@/core/systems/界面通知系统';

export class UITreeManager implements Manager {
  private 界面通知系统实例: 界面通知系统;

  constructor(界面通知系统实例: 界面通知系统) {
    this.界面通知系统实例 = 界面通知系统实例;
  }

  async work(
    文档环境实例: DocumentEnv,
    验证管理者实例: 验证管理者,
    图标管理者实例: 图标管理者,
    跟随鼠标显示内容管理者实例: 跟随鼠标显示内容管理者,
    界面状态管理者实例: UIStoreManager,
    全局事件系统实例: 全局事件系统,
    导航系统实例: 导航系统,
  ) {
    文档环境实例.emitter.on('pageLoadComplete', () => {
      ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
          <系统上下文.Provider
            value={{
              导航系统: 导航系统实例,
              全局事件系统: 全局事件系统实例,
              界面通知系统: this.界面通知系统实例,
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
                              <Route path={paths.root} element={<Root />}>
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
        </React.StrictMode>,
      );
    });
  }
}
