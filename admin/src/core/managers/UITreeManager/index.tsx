import { paths } from '@/configs';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Root } from './root';
import { Admin } from './root/(admin)';
import { Auth } from './root/(auth)';
import { Login } from './root/(auth)/login';
import { Register } from './root/(auth)/register';
import { NotFound } from './root/404';

export class UITreeManager {
  private static instance: UITreeManager | undefined;

  private constructor() {}

  public static getInstance(): UITreeManager {
    if (!this.instance) {
      this.instance = new UITreeManager();
    }
    return this.instance;
  }

  work() {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <BrowserRouter basename={import.meta.env.DEV ? '' : '/admin'}>
          <Routes>
            <Route path={paths.root} element={<Root />}>
              {/* <Route path="test" element={<Test />}></Route> */}
              <Route index element={<Admin />}></Route>
              <Route element={<Auth />}>
                <Route index element={<Login />}></Route>
                <Route path={paths.login} element={<Login />}></Route>
                <Route path={paths.register} element={<Register />}></Route>
              </Route>
              {/* 404 路由放在最后，捕获所有未匹配的路径 */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>,
    );
  }
}
