import { matchPath } from ".";
import { describe, it, expect } from "vitest";

describe("matchPath", () => {
  it("应该匹配完全相同的路径并返回空对象", () => {
    expect(matchPath("/home", "/home")).toEqual({});
    expect(matchPath("/about", "/about")).toEqual({});
  });

  it("不应该匹配不同的路径并返回 null", () => {
    expect(matchPath("/home", "/about")).toBeNull();
    expect(matchPath("/about", "/contact")).toBeNull();
  });

  it("应该匹配带有参数的路径并返回参数对象", () => {
    expect(matchPath("/user/:id", "/user/123")).toEqual({ id: "123" });
    expect(matchPath("/product/:name", "/product/book")).toEqual({
      name: "book",
    });
  });

  it("应该匹配带有可选参数的路径并返回参数对象", () => {
    expect(matchPath("/user/:id?", "/user/123")).toEqual({ id: "123" });
    expect(matchPath("/user/:id?", "/user")).toEqual({});
    expect(matchPath("/:lang?/categories", "/en/categories")).toEqual({
      lang: "en",
    });
    expect(matchPath("/:lang?/categories", "/categories")).toEqual({});
  });

  it("应该匹配带有通配符的路径并返回参数对象", () => {
    expect(matchPath("/files/*", "/files/image.png")).toEqual({
      "*": "image.png",
    });
    expect(matchPath("/files/*", "/files/documents/report.pdf")).toEqual({
      "*": "documents/report.pdf",
    });
  });

  it("应该处理复杂的模式并返回参数对象", () => {
    expect(matchPath("/:lang?/user/:id/*", "/en/user/123/details")).toEqual({
      lang: "en",
      id: "123",
      "*": "details",
    });
    expect(matchPath("/:lang?/user/:id/*", "/user/123/details")).toEqual({
      id: "123",
      "*": "details",
    });
    expect(matchPath("/:lang?/user/:id/*", "/user/123")).toEqual({
      id: "123",
      "*": "",
    });
  });

  it("如果模式比路径短，不应该匹配并返回 null", () => {
    expect(matchPath("/home", "/home/about")).toBeNull();
    expect(matchPath("/user/:id", "/user/123/details")).toBeNull();
  });
});
