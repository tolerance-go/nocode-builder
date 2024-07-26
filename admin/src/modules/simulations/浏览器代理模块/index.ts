import { EngineBase, ModuleBase } from '@/base';
import { authPathnames } from '@/common/constants';

export class 浏览器代理模块 extends ModuleBase {
  private static instance: 浏览器代理模块;

  public static getInstance(engine: EngineBase): 浏览器代理模块 {
    if (!浏览器代理模块.instance) {
      浏览器代理模块.instance = new 浏览器代理模块(engine);
    }
    ModuleBase.断言实例是否合法(浏览器代理模块.instance, engine);
    return 浏览器代理模块.instance;
  }

  public getFilteredPathname(): string {
    const base = import.meta.env.BASE_URL; // 获取 Vite 配置中的 base URL
    const pathname = window.location.pathname;

    if (pathname.startsWith(base)) {
      return pathname.slice(base.length - 1); // 去除 base 部分
    }
    return pathname;
  }

  public pathnameIsAuth(): boolean {
    const pathname = this.getFilteredPathname();
    return Object.values(authPathnames).includes(pathname);
  }
}
