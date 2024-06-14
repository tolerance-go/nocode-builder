import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryOutlet } from "../MemoryOutlet";
import { MemoryRoute } from "../MemoryRoute";
import { MemoryRouter } from "../MemoryRouter";
import { MemoryRoutes } from "../MemoryRoutes";

describe("MemoryRoute component", () => {
  it("renders correctly with nested routes", () => {
    const Home = () => {
      return (
        <div>
          <h1>欢迎来到主页</h1>
          <MemoryOutlet />
        </div>
      );
    };

    const About = () => {
      return (
        <div>
          <h1>关于我们</h1>
          <MemoryOutlet />
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
        <MemoryRoutes>
          <MemoryRoute path="/" element={<Home />}>
            <MemoryRoute path="about" element={<About />}>
              <MemoryRoute path="team" element={<Team />} />
            </MemoryRoute>
            <MemoryRoute path="contact" element={<Contact />} />
          </MemoryRoute>
        </MemoryRoutes>
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
        <MemoryRoutes>
          <MemoryRoute path="/" element={<Home />}>
            <MemoryRoute path="about" element={<About />}>
              <MemoryRoute path="team" element={<Team />} />
            </MemoryRoute>
            <MemoryRoute path="contact" element={<Contact />} />
          </MemoryRoute>
        </MemoryRoutes>
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

    // 渲染子路径 /about/team
    const { container: teamContainer } = render(
      <MemoryRouter initialEntries={["/about/team"]}>
        <MemoryRoutes>
          <MemoryRoute path="/" element={<Home />}>
            <MemoryRoute path="about" element={<About />}>
              <MemoryRoute path="team" element={<Team />} />
            </MemoryRoute>
            <MemoryRoute path="contact" element={<Contact />} />
          </MemoryRoute>
        </MemoryRoutes>
      </MemoryRouter>
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
      <MemoryRouter initialEntries={["/contact"]}>
        <MemoryRoutes>
          <MemoryRoute path="/" element={<Home />}>
            <MemoryRoute path="about" element={<About />}>
              <MemoryRoute path="team" element={<Team />} />
            </MemoryRoute>
            <MemoryRoute path="contact" element={<Contact />} />
          </MemoryRoute>
        </MemoryRoutes>
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
  });
});
