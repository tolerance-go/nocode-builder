// 检查 id 是否重复
export const checkDuplicateIds = (configs: { id: string }[]) => {
  const ids = new Set<string>();
  configs.forEach((config) => {
    if (ids.has(config.id)) {
      throw new Error(`Duplicate id found: ${config.id}`);
    }
    ids.add(config.id);
  });
};
