/**
 * 判断给定的值是否在枚举中
 * @param value - 要检查的值
 * @param enumObject - 枚举对象
 * @returns 枚举值
 * @throws 如果值不在枚举中则抛出异常
 */
export function assertEnumValue<T extends Record<string, unknown>>(
  value: unknown,
  enumObject: T,
): T[keyof T] {
  if (Object.values(enumObject).includes(value)) {
    return value as T[keyof T];
  }
  throw new Error(`Value "${value}" is not in the enum`);
}
