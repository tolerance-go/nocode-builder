import React from "react";
import ReactDOM from "react-dom/client";
import { Root } from "./root";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./root/entry/login";
import { Admin } from "./root/admin";
import "./i18n"; // 引入 i18n 配置
import "normalize.css";
import "./index.css";
import { Entry } from "./root/entry";
import { Register } from "./root/entry/register";
import { Test } from "./root/test";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="test" element={<Test />}></Route>
          <Route index element={<Admin />}></Route>
          <Route path="admin" element={<Admin />}></Route>
          <Route path="entry" element={<Entry />}>
            <Route index element={<Login />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
