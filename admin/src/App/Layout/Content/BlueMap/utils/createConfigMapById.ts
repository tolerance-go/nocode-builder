// 将配置转化为以 id 为键的对象
export const createConfigMapById = <T extends { id: string }>(
  configs: T[]
): { [key: string]: T } => {
  return configs.reduce((acc, config) => {
    acc[config.id] = config;
    return acc;
  }, {} as { [key: string]: T });
};
