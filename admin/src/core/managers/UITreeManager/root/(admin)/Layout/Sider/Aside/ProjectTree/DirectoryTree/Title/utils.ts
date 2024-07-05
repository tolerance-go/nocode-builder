const 标题格式是否有效 = (input: string): boolean => {
  // 不允许 Postgresql 中的特殊字符
  const regex = /^[^!@#$%^&*()_+\-={}|[\]\\:";'<>?,./]*$/;
  return regex.test(input);
};
// 标题输入框内容是否不合法
export const 标题是否有错 = (value: string): boolean => {
  return value.trim() === '' || !标题格式是否有效(value);
};
