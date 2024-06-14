import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryOutlet as Outlet } from "../../MemoryOutlet";
import { MemoryRoute as Route } from "../../MemoryRoute";
import { MemoryRouter as Router } from "../../MemoryRouter";
import { MemoryRoutes as Routes } from "../../MemoryRoutes";

describe("MemoryRoute 组件", () => {
  const Home = () => {
    return (
      <div>
        <h1>欢迎来到主页</h1>
        <Outlet />
      </div>
    );
  };

  const About = () => {
    return (
      <div>
        <h1>关于我们</h1>
        <Outlet />
      </div>
    );
  };

  const Contact = () => {
    return (
      <div>
        <h1>联系我们</h1>
      </div>
    );
  };

  const Team = () => {
    return (
      <div>
        <h1>我们的团队</h1>
      </div>
    );
  };

  it("嵌套非 Route 子组件，无 Route", () => {
    expect(() => {
      render(
        <Router>
          <Routes>
            <Home />
          </Routes>
        </Router>
      );
    }).not.throw();
  });

  it("嵌套非 Route 子组件", () => {
    expect(() => {
      render(
        <Router>
          <Routes>
            <div>
              <Route>
                <div></div>
              </Route>
            </div>
          </Routes>
        </Router>
      );
    }).not.throw();
  });

  it("支持嵌套其他元素确渲染子路径 /about/team", () => {
    const { container: teamContainer } = render(
      <Router initialEntries={["/about/team"]}>
        <Routes>
          <div>
            {""}
            {100}
            {true}
            {null}
            {undefined}
            <Route path="/" element={<Home />}>
              <div>
                <Route path="about" element={<About />}>
                  <div>
                    <Route path="team" element={<Team />} />
                  </div>
                </Route>
              </div>
              <Route path="contact" element={<Contact />} />
            </Route>
          </div>
        </Routes>
      </Router>
    );

    expect(teamContainer).toMatchInlineSnapshot(`
      <div>
        <div>
          100
          <div>
            <h1>
              欢迎来到主页
            </h1>
            <div>
              <div>
                <h1>
                  关于我们
                </h1>
                <div>
                  <div>
                    <h1>
                      我们的团队
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
