// 将配置转化为以 id 为键的 Map 对象
export const createConfigMapById = <T extends { id: string }>(
  configs: T[]
): Map<string, T> => {
  return configs.reduce((acc, config) => {
    acc.set(config.id, config);
    return acc;
  }, new Map<string, T>());
};
