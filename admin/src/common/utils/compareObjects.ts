export function compareObjects(
  oldObj: Record<string, unknown>,
  newObj: Record<string, unknown>,
  path: string[] = [],
): { added: string[][]; removed: string[][]; changed: string[][] } {
  const added: string[][] = [];
  const removed: string[][] = [];
  const changed: string[][] = [];

  // 获取两个对象的键集合
  const oldKeys = new Set(Object.keys(oldObj));
  const newKeys = new Set(Object.keys(newObj));

  // 找出新增的键
  for (const key of newKeys) {
    if (!oldKeys.has(key)) {
      added.push([...path, key]);
    } else {
      const oldValue = oldObj[key];
      const newValue = newObj[key];

      // 检查数据类型是否一致
      if (typeof oldValue !== typeof newValue) {
        changed.push([...path, key]);
      } else if (
        typeof oldValue === 'object' &&
        oldValue !== null &&
        typeof newValue === 'object' &&
        newValue !== null
      ) {
        // 如果值是对象，则递归比较
        const {
          added: subAdded,
          removed: subRemoved,
          changed: subChanged,
        } = compareObjects(
          oldValue as Record<string, unknown>,
          newValue as Record<string, unknown>,
          [...path, key],
        );
        added.push(...subAdded);
        removed.push(...subRemoved);
        changed.push(...subChanged);
      }
    }
  }

  // 找出删除的键
  for (const key of oldKeys) {
    if (!newKeys.has(key)) {
      removed.push([...path, key]);
    }
  }

  return { added, removed, changed };
}
