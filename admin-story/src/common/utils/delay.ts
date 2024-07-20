/**
 * 创建一个延时Promise，经过指定的毫秒数后解析Promise。
 *
 * @param ms 延迟的毫秒数。
 * @returns Promise<void> 在给定的延迟后解析的Promise。
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
