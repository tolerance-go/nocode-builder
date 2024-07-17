export function constructPathname(base: string, path: string): string {
  const url = new URL(`${base}${removeTrailingSlash(path)}`);
  return url.pathname;
}

/**
 * Remove the trailing slash from a given string.
 * @param url - The input string.
 * @returns The string without the trailing slash.
 */
function removeTrailingSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}
