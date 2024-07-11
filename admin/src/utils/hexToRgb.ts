/**
 * 将 16 进制颜色值转换为 RGB
 * @param hex - 16 进制颜色值，格式为 #RRGGBB 或 #RGB
 * @returns 一个包含 RGB 颜色值的对象
 */
export function hexToRgb(hex: string): [r: number, g: number, b: number] {
  // 去掉颜色值中的 #
  hex = hex.replace(/^#/, '');

  // 处理 #RGB 格式
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // 处理 #RRGGBB 格式
  if (hex.length !== 6) {
    throw new Error('无效的 16 进制颜色值');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}
