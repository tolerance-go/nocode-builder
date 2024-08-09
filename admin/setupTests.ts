import '@testing-library/jest-dom';
import '@ungap/with-resolvers';
import { vi } from 'vitest';

/**
 * 这段代码的主要目的是在测试环境中提供一个模拟的 window.matchMedia 方法，确保在没有真实浏览器环境的情况下，像 Ant Design 这样依赖 matchMedia 的组件能够正常工作。
 * 这避免了在测试过程中出现的 window.matchMedia is not a function 的错误。
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
