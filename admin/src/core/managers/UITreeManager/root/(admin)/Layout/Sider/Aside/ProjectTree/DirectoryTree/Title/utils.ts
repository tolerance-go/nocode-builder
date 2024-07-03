const isValid = (input: string): boolean => {
  // 不允许 Postgresql 中的特殊字符
  const regex = /^[^!@#$%^&*()_+\-={}|[\]\\:";'<>?,./]*$/;
  return regex.test(input);
};
// 标题输入框内容是否不合法
export const isTitleInputError = (value: string): boolean => {
  return value.trim() === '' || !isValid(value);
};
