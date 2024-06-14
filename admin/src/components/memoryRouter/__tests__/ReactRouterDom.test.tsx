import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

describe("MemoryRoute component", () => {
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

  it("renders correctly with nested routes", () => {
    // 渲染主路径
    const { container: homeContainer } = render(
      <Router initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="about" element={<About />}>
              <Route path="team" element={<Team />} />
            </Route>
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    );

    expect(homeContainer).toMatchInlineSnapshot(`
      <div>
        <div>
          <h1>
            欢迎来到主页
          </h1>
        </div>
      </div>
    `);

    // // 渲染子路径 /about
    const { container: aboutContainer } = render(
      <Router initialEntries={["/about"]}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="about" element={<About />}>
              <Route path="team" element={<Team />} />
            </Route>
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    );

    expect(aboutContainer).toMatchInlineSnapshot(`
      <div>
        <div>
          <h1>
            欢迎来到主页
          </h1>
          <div>
            <h1>
              关于我们
            </h1>
          </div>
        </div>
      </div>
    `);

    // 渲染子路径 /about/team
    const { container: teamContainer } = render(
      <Router initialEntries={["/about/team"]}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="about" element={<About />}>
              <Route path="team" element={<Team />} />
            </Route>
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    );

    expect(teamContainer).toMatchInlineSnapshot(`
      <div>
        <div>
          <h1>
            欢迎来到主页
          </h1>
          <div>
            <h1>
              关于我们
            </h1>
            <div>
              <h1>
                我们的团队
              </h1>
            </div>
          </div>
        </div>
      </div>
    `);

    // 渲染子路径 /contact
    const { container: contactContainer } = render(
      <Router initialEntries={["/contact"]}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="about" element={<About />}>
              <Route path="team" element={<Team />} />
            </Route>
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    );

    expect(contactContainer).toMatchInlineSnapshot(`
      <div>
        <div>
          <h1>
            欢迎来到主页
          </h1>
          <div>
            <h1>
              联系我们
            </h1>
          </div>
        </div>
      </div>
    `);

    expect(() => {
      render(<Route path="/" element={<Home />} />);
    }).toThrowErrorMatchingInlineSnapshot(
      `[Error: A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.]`
    );

    expect(() => {
      render(
        <Router>
          <Route path="/" element={<Home />} />
        </Router>
      );
    }).toThrowErrorMatchingInlineSnapshot(
      `[Error: A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.]`
    );

    expect(() => {
      render(
        <Router>
          <Routes>
            {100}
            <Route>{100}</Route>
          </Routes>
        </Router>
      );
    }).not.throw();
  });

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
              <Home />
            </Route>
          </Routes>
        </Router>
      );
    }).toThrowErrorMatchingInlineSnapshot(
      `[Error: [Home] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>]`
    );
  });

  it("省略 path", () => {
    // 渲染子路径 /contact
    const { container: empty } = render(
      <Router initialEntries={["/team"]}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route element={<About />}>
              <Route path="team" element={<Team />} />
            </Route>
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    );

    expect(empty).toMatchInlineSnapshot(`
        <div>
          <div>
            <h1>
              欢迎来到主页
            </h1>
            <div>
              <h1>
                关于我们
              </h1>
              <div>
                <h1>
                  我们的团队
                </h1>
              </div>
            </div>
          </div>
        </div>
      `);
  });

  it("深层级省略 path", () => {
    // 渲染子路径 /contact
    const { container: empty } = render(
      <Router initialEntries={["/about"]}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="about" element={<About />}>
              <Route element={<Team />} />
            </Route>
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    );

    expect(empty).toMatchInlineSnapshot(`
      <div>
        <div>
          <h1>
            欢迎来到主页
          </h1>
          <div>
            <h1>
              关于我们
            </h1>
          </div>
        </div>
      </div>
    `);
  });
});
