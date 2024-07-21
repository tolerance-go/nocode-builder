import { ManagerBase } from '@/base';
import { EngineManager } from '@/base/EngineManager';
import { fullPathnames, paths } from '@/common/constants';
import { Engine } from '@/common/types';
import {
  全局事件系统实例,
  全局界面导航系统实例,
  全局界面通知系统实例,
} from '@/globals';
import { 文档环境 } from '@/modules/envs';
import { 界面导航系统 } from '@/modules/systems';
import { 全局事件系统 } from '@/modules/systems/全局事件系统';
import { 界面通知系统 } from '@/modules/systems/界面通知系统';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UIStoreManager } from '../UIStoreManager';
import { 图标管理者 } from '../图标管理者';
import { 跟随鼠标显示内容管理者 } from '../跟随鼠标显示内容管理者';
import { 项目树历史纪录管理者 } from '../项目树历史纪录管理者';
import { 验证管理者 } from '../验证管理者';
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
import { BluemapEditor } from './root/(admin)/Layout/内容区域组件/bluemap-editor';
import { DataTableEditor } from './root/(admin)/Layout/内容区域组件/data-table-editor';
import { ViewEditor } from './root/(admin)/Layout/内容区域组件/view-editor';
import { Auth } from './root/(auth)';
import { Login } from './root/(auth)/login';
import { Register } from './root/(auth)/register';
import { NotFound } from './root/404';

export class UITreeManager extends ManagerBase {
  engine;
  engineManager;

  constructor(engineManager: EngineManager, engine: Engine) {
    super();
    this.engine = engine;
    this.engineManager = engineManager;
  }

  requireModules() {
    super.requireModules(
      new 项目树历史纪录管理者(this.engine),
      new 文档环境(document),
      全局界面通知系统实例,
      new 验证管理者(),
      new 图标管理者(),
      new 跟随鼠标显示内容管理者(),
      new UIStoreManager(this.engine),
      全局事件系统实例,
      全局界面导航系统实例,
    );
  }

  protected async onSetup() {
    const 验证管理者实例 = this.getDependModule(验证管理者);
    const 图标管理者实例 = this.getDependModule(图标管理者);
    const 跟随鼠标显示内容管理者实例 =
      this.getDependModule(跟随鼠标显示内容管理者);
    const 界面状态管理者实例 = this.getDependModule(UIStoreManager);
    const 全局事件系统实例 = this.getDependModule(全局事件系统);
    const 导航系统实例 = this.getDependModule(界面导航系统);
    const 界面通知系统实例 = this.getDependModule(界面通知系统);

    全局事件系统实例.on('文档环境/pageLoadComplete', () => {
      ReactDOM.createRoot(document.getElementById('root')!).render(
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
                              <Route
                                path={fullPathnames.root}
                                element={<Root />}
                              >
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
