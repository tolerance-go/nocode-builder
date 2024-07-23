export const topologicalSort = <T>(
  modules: Set<T>,
  getDependencies: (module: T) => Set<T>,
): T[] => {
  const sorted: T[] = [];
  const visited = new Set<T>();
  const tempMarks = new Set<T>();

  const visit = (module: T) => {
    if (tempMarks.has(module)) {
      throw new Error('Circular dependency detected');
    }
    if (!visited.has(module)) {
      tempMarks.add(module);
      getDependencies(module).forEach(visit);
      tempMarks.delete(module);
      visited.add(module);
      sorted.push(module);
    }
  };

  modules.forEach((module) => {
    if (!visited.has(module)) {
      visit(module);
    }
  });

  return sorted;
};
