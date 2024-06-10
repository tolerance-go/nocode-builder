import { Header } from "./header";

export const Layout = () => {
  return (
    <div className="bg-gray-100">
      {/* 顶部导航栏 */}
      <header className="text-white px-4 border-b">
        <Header />
      </header>

      <div className="flex flex-row h-screen">
        {/* 左侧边栏 */}
        <aside className="bg-gray-200 w-1/4 p-4">
          <h2 className="text-lg">左侧边栏</h2>
          <p>一些内容...</p>
        </aside>

        {/* 中间内容区域 */}
        <main className="flex-1 bg-white p-4">
          <h2 className="text-lg">中间内容区域</h2>
          <p>这里是主要内容...</p>
        </main>

        {/* 右侧边栏 */}
        <aside className="bg-gray-200 w-1/4 p-4">
          <h2 className="text-lg">右侧边栏</h2>
          <p>一些内容...</p>
        </aside>
      </div>
    </div>
  );
};
