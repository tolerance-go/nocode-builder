import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Root } from '@/root';
import { Login } from '@/root/(auth)/login';
// import { Admin } from "@/root/admin";
import { Admin } from '@/root/(admin)';
import { Auth } from '@/root/(auth)';
import { Register } from '@/root/(auth)/register';
// import { Test } from "@/root/test";
import { paths } from '@/configs';
import { NotFound } from '@/root/404';
import 'normalize.css';
import '@/index.css';
import '@/subscribes';

export class RenderSystem {
  render() {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <BrowserRouter basename={import.meta.env.DEV ? '' : '/admin'}>
          <Routes>
            <Route path={paths.root} element={<Root />}>
              {/* <Route path="test" element={<Test />}></Route>
               */}
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
