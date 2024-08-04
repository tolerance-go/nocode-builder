import { EngineBase, ModuleBase } from '@/base';
import { authPathnames } from '@/common/constants';
import qs from 'qs';

export class 浏览器代理模块 extends ModuleBase {
  private static instance: 浏览器代理模块;

  public static getInstance(engine: EngineBase): 浏览器代理模块 {
    if (!浏览器代理模块.instance) {
      浏览器代理模块.instance = new 浏览器代理模块(engine);
    }

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

  public updateQueryParameter(key: string, value: string | null): void {
    const url = new URL(window.location.href);
    if (value === null) {
      url.searchParams.delete(key); // 删除指定的查询参数
    } else {
      url.searchParams.set(key, value); // 设置新的查询参数
    }
    window.history.pushState({}, '', url.toString()); // 更新浏览器地址栏的 URL 并添加历史记录
  }

  public getQueryParameters<T = unknown>(key: string): T | undefined {
    const queryString = window.location.search.slice(1); // 去掉开头的 '?'
    const params = qs.parse(queryString);

    return params[key] as T | undefined;
  }
}
