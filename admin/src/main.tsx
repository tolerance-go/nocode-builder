import React from "react";
import ReactDOM from "react-dom/client";
import { Root } from "./root";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./root/login";
import { Admin } from "./root/admin";
import "./i18n"; // 引入 i18n 配置
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Login />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="admin" element={<Admin />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
