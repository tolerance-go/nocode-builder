export function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    Object.prototype.toString.call(value) === "[object Object]" &&
    !Array.isArray(value)
  );
}

//   // 示例用法
//   console.log(isPlainObject({})); // true
//   console.log(isPlainObject([])); // false
//   console.log(isPlainObject(null)); // false
//   console.log(isPlainObject('string')); // false
//   console.log(isPlainObject(123)); // false
//   console.log(isPlainObject({ key: 'value' })); // true
//   console.log(isPlainObject([1, 2, 3])); // false
