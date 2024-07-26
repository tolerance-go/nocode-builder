import { describe, it, expect, beforeEach } from 'vitest';
import { EngineBase } from '@/base';
import { 浏览器代理模块 } from '.';
import { EngineManagerBase } from '@/base/EngineManager';

describe('浏览器代理模块', () => {
  let module: 浏览器代理模块;
  let engine: EngineBase;

  beforeEach(async () => {
    class TestEngineManager extends EngineManagerBase {
      protected providerEngines(): void {
        super.providerEngines(new TestEngine(this));
      }
    }
    class TestEngine extends EngineBase {
      protected providerModules(): void {
        super.providerModules(new 浏览器代理模块(this));
      }
    }

    const engineManager = new TestEngineManager();
    await engineManager.launch();
    engine = engineManager.getEngine(TestEngine);
    module = engine.getModule(浏览器代理模块);
  });

  it('应该返回去掉 base URL 的 pathname', () => {
    // 模拟 Vite 配置中的 base URL
    const originalBaseUrl = import.meta.env.BASE_URL;
    import.meta.env.BASE_URL = '/admin/';

    // 模拟 window.location.pathname
    const originalPathname = window.location.pathname;
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/admin/dashboard',
      },
      writable: true,
    });

    const filteredPathname = module.getFilteredPathname();
    expect(filteredPathname).toBe('/dashboard');

    // 恢复原始值
    import.meta.env.BASE_URL = originalBaseUrl;
    Object.defineProperty(window, 'location', {
      value: { pathname: originalPathname },
    });
  });

  it('如果 pathname 不以 base URL 开头应该返回原始 pathname', () => {
    // 模拟 Vite 配置中的 base URL
    const originalBaseUrl = import.meta.env.BASE_URL;
    import.meta.env.BASE_URL = '/admin/';

    // 模拟 window.location.pathname
    const originalPathname = window.location.pathname;
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/user/profile',
      },
      writable: true,
    });

    const filteredPathname = module.getFilteredPathname();
    expect(filteredPathname).toBe('/user/profile');

    // 恢复原始值
    import.meta.env.BASE_URL = originalBaseUrl;
    Object.defineProperty(window, 'location', {
      value: { pathname: originalPathname },
    });
  });
});
