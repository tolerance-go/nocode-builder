import { fullPaths, authPaths } from '@/configs';

/**
 * 判断给定的 URL 是否为登录相关的 URL。
 * @param url - 待检测的 URL 字符串。
 * @returns 是否为登录相关的 URL。
 */
export function isAuthRelatedPath(url: string): boolean {
  const loginPaths = Object.values(authPaths);
  return loginPaths.some((path) => url.includes(path));
}

export function isSystemPath(url: string): boolean {
  const loginPaths = Object.values(fullPaths);
  return loginPaths.some((path) => url.includes(path));
}
