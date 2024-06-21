import { describe, it, expect, beforeEach, vi } from "vitest";
import { EventBus } from ".";

type TestEvents = {
  user: {
    name: string;
    age: number;
  };
  order: {
    id: string;
    amount: number;
  };
};

describe("EventBus", () => {
  let eventBus: EventBus<TestEvents>;

  beforeEach(() => {
    eventBus = new EventBus<TestEvents>();
  });

  it("应该注册并触发监听器", () => {
    const listener = vi.fn();
    eventBus.on("user.name", listener);

    eventBus.emit("user.name", "Alice");

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith("Alice");
  });

  it("应该注册多个监听器并触发它们", () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    eventBus.on("user.age", listener1);
    eventBus.on("user.age", listener2);

    eventBus.emit("user.age", 30);

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener1).toHaveBeenCalledWith(30);
    expect(listener2).toHaveBeenCalledOnce();
    expect(listener2).toHaveBeenCalledWith(30);
  });

  it("应该取消注册监听器", () => {
    const listener = vi.fn();
    const off = eventBus.on("order.id", listener);

    off();
    eventBus.emit("order.id", "12345");

    expect(listener).not.toHaveBeenCalled();
  });

  it("应该使用之前的事件立即触发监听器", () => {
    const listener = vi.fn();
    eventBus.emit("order.amount", 100);

    eventBus.on("order.amount", listener, { immediate: true });

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith(100);
  });

  it("应该触发嵌套路径的监听器", () => {
    const listener = vi.fn();
    eventBus.on("user", listener);

    eventBus.emit("user", { name: "Bob", age: 25 });

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith({ name: "Bob", age: 25 });
  });

  it("不应该触发无关事件的监听器", () => {
    const listener = vi.fn();
    eventBus.on("user.name", listener);

    eventBus.emit("order.id", "67890");

    expect(listener).not.toHaveBeenCalled();
  });

  it("应该在触发事件时保存事件历史", () => {
    eventBus.emit("user.name", "Charlie");
    expect(eventBus["eventHistory"]["user.name"]).toEqual(["Charlie"]);
  });

  it("应该处理数组类型的事件负载", () => {
    type ArrayTestEvents = {
      items: [number[]];
    };
    const arrayEventBus = new EventBus<ArrayTestEvents>();
    const listener = vi.fn();
    arrayEventBus.on("items", listener);

    arrayEventBus.emit("items", [1, 2, 3]);

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith([1, 2, 3]);
  });

  it("应该递归触发子路径的监听器", () => {
    const listener = vi.fn();
    eventBus.on("user", listener);

    eventBus.emit("user", { name: "Eve", age: 20 });

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith({ name: "Eve", age: 20 });
  });

  it("应该确保多次触发同一事件类型的监听器", () => {
    const listener = vi.fn();
    eventBus.on("user.name", listener);

    eventBus.emit("user.name", "Alice");
    eventBus.emit("user.name", "Bob");

    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener).toHaveBeenCalledWith("Alice");
    expect(listener).toHaveBeenCalledWith("Bob");
  });

  it("应该在取消注册后不再触发监听器", () => {
    const listener = vi.fn();
    const off = eventBus.on("order.amount", listener);

    off();
    eventBus.emit("order.amount", 200);

    expect(listener).not.toHaveBeenCalled();
  });
});
