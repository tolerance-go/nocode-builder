import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

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
    }).toThrowErrorMatchingInlineSnapshot(
      `[Error: [Home] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>]`
    );
  });

  it("嵌套非 Route 子组件", () => {
    expect(() => {
      render(
        <Router>
          <Routes>
            <Route>
              <div></div>
            </Route>
          </Routes>
        </Router>
      );
    }).toThrowErrorMatchingInlineSnapshot(
      `[Error: [div] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>]`
    );
  });
});
