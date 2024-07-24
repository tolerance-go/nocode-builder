type CacheKeyArgs = string | string[];

class CacheSet<T> implements Iterable<T> {
  private items: Set<T>;
  private cache: Map<string, { arg: unknown; result: T | undefined }>;

  constructor() {
    this.items = new Set<T>();
    this.cache = new Map();
  }

  // 获取集合大小
  get length(): number {
    return this.items.size;
  }

  // 获取集合大小
  size(): number {
    return this.items.size;
  }

  // 添加元素
  add(element: T): this {
    this.items.add(element);
    this.clearCache(); // 集合变化，清除缓存
    return this;
  }

  // 删除元素
  delete(element: T): boolean {
    const result = this.items.delete(element);
    if (result) {
      this.clearCache(); // 集合变化，清除缓存
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

  // 清空集合
  clear(): void {
    this.items.clear();
    this.clearCache(); // 集合变化，清除缓存
  }

  // 查找符合条件的第一个元素
  findWithCache(
    predicate: (element: T) => boolean,
    cacheKeyArgs: CacheKeyArgs,
  ): T | undefined {
    const cacheKey = this.generateCacheKey(cacheKeyArgs);
    const cached = this.cache.get(cacheKey);

    if (cached) {
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

    return result;
  }

  // 迭代器
  [Symbol.iterator](): IterableIterator<T> {
    return this.items[Symbol.iterator]();
  }

  // forEach 方法
  forEach(
    callback: (value: T, value2: T, set: CacheSet<T>) => void,
    thisArg?: unknown,
  ): void {
    this.items.forEach((value, value2) =>
      callback.call(thisArg, value, value2, this),
    );
  }

  // 自定义序列化方法
  toJSON() {
    return Array.from(this.items);
  }

  // 清除缓存
  private clearCache(): void {
    this.cache.clear();
  }

  // 生成缓存键
  private generateCacheKey(arg: CacheKeyArgs): string {
    return arg !== undefined ? JSON.stringify(arg) : '';
  }
}

// 导出 CacheSet 类
export { CacheSet };
