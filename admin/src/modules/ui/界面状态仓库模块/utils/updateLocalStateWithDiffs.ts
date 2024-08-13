// 类型守卫函数，检查对象是否是 Record<string, unknown> 类型
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// 更新本地数据的方法
export function updateLocalStateWithDiffs(
  localState: Record<string, unknown>,
  programState: Record<string, unknown>,
  diffs: { added: string[][]; changed: string[][] },
): Record<string, unknown> {
  // 处理新增字段
  diffs.added.forEach((path) => {
    let target = localState;
    let source = programState;

    // 遍历路径，确保所有中间对象都存在
    path.slice(0, -1).forEach((key) => {
      if (isRecord(target) && isRecord(source)) {
        if (!(key in target)) {
          target[key] = {};
        }
        target = target[key] as Record<string, unknown>;
        source = source[key] as Record<string, unknown>;
      }
    });

    // 最后一个路径元素赋值
    if (isRecord(target) && isRecord(source)) {
      target[path[path.length - 1]] = source[path[path.length - 1]];
    }
  });

  // 处理类型变化的字段：删除旧字段，添加新字段
  diffs.changed.forEach((path) => {
    let target = localState;
    let source = programState;

    // 遍历路径，确保所有中间对象都存在
    path.slice(0, -1).forEach((key) => {
      if (isRecord(target) && isRecord(source)) {
        if (!(key in target)) {
          target[key] = {};
        }
        target = target[key] as Record<string, unknown>;
        source = source[key] as Record<string, unknown>;
      }
    });

    // 最后一个路径元素先删除再赋值
    if (isRecord(target) && isRecord(source)) {
      delete target[path[path.length - 1]];
      target[path[path.length - 1]] = source[path[path.length - 1]];
    }
  });

  return localState;
}
