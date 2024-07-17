export function constructPathname(base: string, path: string): string {
  const url = new URL(`${base}${path}`.replace('//', '/'));
  return url.pathname;
}
