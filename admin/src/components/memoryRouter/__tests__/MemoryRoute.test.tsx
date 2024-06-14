import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryOutlet } from "../MemoryOutlet";
import { MemoryRoute } from "../MemoryRoute";
import { MemoryRouter } from "../MemoryRouter";

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

    // 渲染主路径
    const { container: homeContainer } = render(
      <MemoryRouter initialEntries={["/"]}>
        <MemoryRoute path="/" element={<Home />}>
          <MemoryRoute path="about" element={<About />} />
          <MemoryRoute path="contact" element={<Contact />} />
        </MemoryRoute>
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
        <MemoryRoute path="/" element={<Home />}>
          <MemoryRoute path="about" element={<About />} />
          <MemoryRoute path="contact" element={<Contact />} />
        </MemoryRoute>
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
        <MemoryRoute path="/" element={<Home />}>
          <MemoryRoute path="about" element={<About />} />
          <MemoryRoute path="contact" element={<Contact />} />
        </MemoryRoute>
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
