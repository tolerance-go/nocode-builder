在 JavaScript 的 `Set` 对象中，有以下常用的 API：

### Set 实例方法

1. **`add(value)`**
   - 添加一个值到 `Set` 对象中。如果这个值已经在 `Set` 中，则 `Set` 结构不会发生变化。返回 `Set` 对象本身。
   ```javascript
   const set = new Set();
   set.add(1);
   ```

2. **`delete(value)`**
   - 从 `Set` 对象中移除一个值。如果该值在 `Set` 对象中，则返回 `true`，否则返回 `false`。
   ```javascript
   set.delete(1);
   ```

3. **`has(value)`**
   - 判断一个值是否在 `Set` 对象中。如果存在则返回 `true`，否则返回 `false`。
   ```javascript
   set.has(1); // false
   ```

4. **`clear()`**
   - 移除 `Set` 对象中的所有元素。
   ```javascript
   set.clear();
   ```

5. **`forEach(callback, [thisArg])`**
   - 使用提供的回调函数对 `Set` 对象中的每个值执行一次。
   ```javascript
   set.add(1).add(2).add(3);
   set.forEach(value => {
     console.log(value);
   });
   // 输出：1 2 3
   ```

### Set 属性

1. **`size`**
   - 返回 `Set` 对象中值的个数。
   ```javascript
   console.log(set.size); // 3
   ```

### Set 迭代方法

1. **`keys()`**
   - 返回一个新的 `Iterator` 对象，它包含 `Set` 对象中每个元素的键。由于 `Set` 对象中的键与值相同，所以 `keys` 方法与 `values` 方法相同。
   ```javascript
   const iterator = set.keys();
   for (const key of iterator) {
     console.log(key);
   }
   ```

2. **`values()`**
   - 返回一个新的 `Iterator` 对象，它包含 `Set` 对象中每个元素的值。
   ```javascript
   const iterator = set.values();
   for (const value of iterator) {
     console.log(value);
   }
   ```

3. **`entries()`**
   - 返回一个新的 `Iterator` 对象，它包含 `Set` 对象中每个元素的 `[value, value]` 数组，类似于 `Map` 对象的 `entries` 方法。
   ```javascript
   const iterator = set.entries();
   for (const entry of iterator) {
     console.log(entry);
   }
   // 输出：[1, 1] [2, 2] [3, 3]
   ```

通过这些 API，你可以方便地对 `Set` 对象进行操作和遍历。