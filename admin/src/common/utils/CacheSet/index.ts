type CacheKeyArgs = string;

class CacheSet<T> {
  private items: Set<T>;
  private cache: Map<string, { arg: unknown; result: T | undefined }>;
  private itemsSnapshot: string;

  constructor() {
    this.items = new Set<T>();
    this.cache = new Map();
    this.itemsSnapshot = this.getSnapshot();
  }

  // 添加元素
  add(element: T): this {
    this.items.add(element);
    this.itemsSnapshot = this.getSnapshot();
    this.cache.clear(); // 集合变化，清除缓存
    return this;
  }

  // 删除元素
  delete(element: T): boolean {
    const result = this.items.delete(element);
    if (result) {
      this.itemsSnapshot = this.getSnapshot();
      this.cache.clear(); // 集合变化，清除缓存
    }
    return result;
  }

  // 检查元素是否存在
  has(element: T): boolean {
    return this.items.has(element);
  }

  // 获取所有元素
  values(): T[] {
    return Array.from(this.items);
  }

  // 获取集合大小
  size(): number {
    return this.items.size;
  }

  // 清空集合
  clear(): void {
    this.items.clear();
    this.itemsSnapshot = this.getSnapshot();
    this.cache.clear(); // 集合变化，清除缓存
  }

  // 查找符合条件的第一个元素
  findWithCache(
    predicate: (element: T) => boolean,
    cacheKeyArgs: CacheKeyArgs,
  ): T | undefined {
    const cacheKey = this.generateCacheKey(cacheKeyArgs);
    const cached = this.cache.get(cacheKey);

    if (cached && this.itemsSnapshot === this.getSnapshot()) {
      return cached.result;
    }

    let result: T | undefined = undefined;

    for (const item of this.items) {
      if (predicate(item)) {
        result = item;
        break;
      }
    }

    this.cache.set(cacheKey, { arg: cacheKeyArgs, result });
    this.itemsSnapshot = this.getSnapshot();

    return result;
  }
  // 获取集合的快照（用于检测变化）
  private getSnapshot(): string {
    return JSON.stringify(Array.from(this.items));
  }

  // 生成缓存键
  private generateCacheKey(arg: CacheKeyArgs): string {
    return arg !== undefined ? JSON.stringify(arg) : '';
  }
}

// 导出 CacheSet 类
export { CacheSet };
