import { paths } from '@/configs';
import { Manager } from '@/types';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { reduxStore, UIStoreManager } from '../UIStoreManager';
import { 图标管理者 } from '../图标管理者';
import { 跟随鼠标显示内容管理者 } from '../跟随鼠标显示内容管理者';
import {
  UIStoreManagerContext,
  图标管理者Context,
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

export class UITreeManager implements Manager {
  private static instance: UITreeManager | undefined;

  private constructor() {}

  public static getInstance(): UITreeManager {
    if (!this.instance) {
      this.instance = new UITreeManager();
    }
    return this.instance;
  }

  work(
    文档环境实例: DocumentEnv,
    验证管理者实例: 验证管理者,
    图标管理者实例: 图标管理者,
    跟随鼠标显示内容管理者实例: 跟随鼠标显示内容管理者,
    界面状态管理者实例: UIStoreManager,
  ) {
    文档环境实例.emitter.on('pageLoadComplete', () => {
      ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
          <UIStoreManagerContext.Provider value={界面状态管理者实例}>
            <验证管理者Context.Provider value={验证管理者实例}>
              <跟随鼠标显示内容管理者Context.Provider
                value={跟随鼠标显示内容管理者实例}
              >
                <图标管理者Context.Provider value={图标管理者实例}>
                  <Provider store={reduxStore}>
                    <BrowserRouter
                      basename={import.meta.env.DEV ? '' : '/admin'}
                    >
                      <Routes>
                        <Route path={paths.root} element={<Root />}>
                          {/* <Route path="test" element={<Test />}></Route> */}
                          <Route index element={<Admin />}></Route>
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
                          {/* 404 路由放在最后，捕获所有未匹配的路径 */}
                          <Route path="*" element={<NotFound />} />
                        </Route>
                      </Routes>
                    </BrowserRouter>
                  </Provider>
                </图标管理者Context.Provider>
              </跟随鼠标显示内容管理者Context.Provider>
            </验证管理者Context.Provider>
          </UIStoreManagerContext.Provider>
        </React.StrictMode>,
      );
    });
  }
}
