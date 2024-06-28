import React from "react";
import ReactDOM from "react-dom/client";
import { Root } from "./root";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./root/(auth)/login";
// import { Admin } from "./root/admin";
import { Auth } from "./root/(auth)";
import { Register } from "./root/(auth)/register";
// import { Test } from "./root/test";
import "./i18n"; // 引入 i18n 配置
import "normalize.css";
import "./index.css";
import { Admin } from "./root/(admin)";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? "" : "/admin"}>
      <Routes>
        <Route path="/" element={<Root />}>
          {/* <Route path="test" element={<Test />}></Route>
           */}
          <Route index element={<Admin />}></Route>
          <Route element={<Auth />}>
            <Route index element={<Login />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
