export function collectDependencies<T>(
  items: Set<T>,
  dependencies: Map<T, Set<T>>,
  dependents: Map<T, Set<T>>,
  getDependencies: (item: T) => Set<T>,
): void {
  items.forEach((item) => {
    const deps = getDependencies(item);
    dependencies.set(item, deps);

    deps.forEach((dep) => {
      if (!dependents.has(dep)) {
        dependents.set(dep, new Set());
      }
      dependents.get(dep)?.add(item);
    });
  });
}
