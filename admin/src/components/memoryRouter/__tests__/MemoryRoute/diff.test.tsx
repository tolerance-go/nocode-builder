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
});
