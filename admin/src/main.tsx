import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n"; // 引入 i18n 配置
import "./index.css";
// import { Test } from "./Test";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
