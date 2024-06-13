import { useMatch } from "react-router-dom";
import { Content } from "./Content";
import { Header } from "./Header";
import { LeftAside } from "./LeftAside";
import { RightAside } from "./RightAside";

export const Layout = () => {
  const rightAsideMatch = useMatch("/apps/:id/design");

  return (
    <div className="bg-gray-100">
      {/* 顶部导航栏 */}
      <header className="text-white px-4 border-b">
        <Header />
      </header>

      <div className="flex flex-row h-screen">
        {/* 左侧边栏 */}
        <aside className="bg-gray-200 w-[400px] border-r">
          <LeftAside />
        </aside>

        {/* 中间内容区域 */}
        <main className="flex-1 bg-white">
          <Content />
        </main>

        {/* 右侧边栏 */}
        {rightAsideMatch && <RightAside />}
      </div>
    </div>
  );
};
