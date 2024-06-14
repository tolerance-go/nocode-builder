import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";

describe("Route components", () => {
  it("renders correctly with nested routes", () => {
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

    // 渲染主路径
    const { container: homeContainer } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="about" element={<About />}>
              <Route path="team" element={<Team />} />
            </Route>
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </MemoryRouter>
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

    // 渲染子路径 /about
    const { container: aboutContainer } = render(
      <MemoryRouter initialEntries={["/about"]}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="about" element={<About />}>
              <Route path="team" element={<Team />} />
            </Route>
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </MemoryRouter>
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

    // 渲染子路径 /contact
    const { container: contactContainer } = render(
      <MemoryRouter initialEntries={["/contact"]}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="about" element={<About />}>
              <Route path="team" element={<Team />} />
            </Route>
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </MemoryRouter>
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
        <MemoryRouter>
          <Route path="/" element={<Home />} />
        </MemoryRouter>
      );
    }).toThrowErrorMatchingInlineSnapshot(
      `[Error: A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.]`
    );

    expect(() => {
      render(
        <MemoryRouter>
          <Routes>
            {100}
            <Route>{100}</Route>
          </Routes>
        </MemoryRouter>
      );
    }).not.throw();

    expect(() => {
      render(
        <MemoryRouter>
          <Routes>
            <Route>
              <Home />
            </Route>
          </Routes>
        </MemoryRouter>
      );
    }).toThrowErrorMatchingInlineSnapshot(
      `[Error: [Home] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>]`
    );

    expect(() => {
      render(
        <MemoryRouter>
          <Routes>
            <Home />
          </Routes>
        </MemoryRouter>
      );
    }).toThrowErrorMatchingInlineSnapshot(
      `[Error: [Home] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>]`
    );
  });
});
