// 类型断言函数
export const isPrimitive = (
  value: unknown
): value is string | number | boolean | undefined | null => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === undefined ||
    value === null
  );
};
