export interface 节点父级映射<T> {
  [key: string]: T | null;
}

export const 过滤掉包含父节点在内的节点 = <T extends string | number>(
  节点键集合: T[],
  节点映射关系: 节点父级映射<T>,
): T[] => {
  const 键集合 = new Set(节点键集合);
  return 节点键集合.filter((键) => {
    const 父节点键 = 节点映射关系[键];
    return 父节点键 === null || !键集合.has(父节点键);
  });
};
