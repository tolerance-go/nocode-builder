export function collectDependencies<T>(
  items: Set<T>,
  dependencies: Map<T, Set<T>>,
  dependents: Map<T, Set<T>>,
  getDependencies: (item: T) => Set<T>,
): void {
  function addDependencies(item: T) {
    const deps = getDependencies(item);

    if (!dependencies.has(item)) {
      dependencies.set(item, new Set());
    }

    deps.forEach((dep) => {
      if (!dependencies.has(dep)) {
        addDependencies(dep);
      }

      dependencies.get(item)?.add(dep);

      if (!dependents.has(dep)) {
        dependents.set(dep, new Set());
      }
      dependents.get(dep)?.add(item);
    });
  }

  items.forEach((item) => {
    addDependencies(item);
  });
}
