import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

export const Test = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

// 示例 Home 组件
const Home = () => {
  return (
    <div>
      <h1>欢迎来到主页</h1>
      <Outlet />
    </div>
  );
};

// 示例 About 组件
const About = () => {
  return (
    <div>
      <h1>关于我们</h1>
    </div>
  );
};

// 示例 Contact 组件
const Contact = () => {
  return (
    <div>
      <h1>联系我们</h1>
    </div>
  );
};

// 示例 NotFound 组件
const NotFound = () => {
  return (
    <div>
      <h1>404 未找到</h1>
    </div>
  );
};
