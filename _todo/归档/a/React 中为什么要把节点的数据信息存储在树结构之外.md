在 React 中将节点的数据信息存储在树结构之外有几个重要的原因：

1. **状态管理的简化**：当数据和 UI 结构解耦时，管理状态变化会更简单。你可以集中管理数据，而不必担心 UI 组件之间的复杂交互。

2. **性能优化**：将数据与 UI 分离可以减少不必要的重新渲染。当数据变化时，只需要更新受影响的部分，而不是整个树结构。

3. **可维护性**：独立的数据层使代码更易于维护和扩展。你可以更容易地测试和调试数据逻辑，而不必深入复杂的 UI 组件树中。

4. **组件重用性**：当数据与组件解耦时，同一组数据可以通过不同的组件展示，增加了组件的重用性。

5. **数据共享**：如果多个组件需要访问和修改同一份数据，将数据存储在树结构之外，可以更容易地共享和同步数据。

### 示例

假设你有一个表示树结构的组件，你可以将树节点的数据存储在外部状态管理系统（例如 Valtio、Redux 或 Context）中，而不是直接嵌入到组件中。

```jsx
import { useSnapshot } from 'valtio';
import { treeDataState } from './state';

const TreeNode = ({ nodeId }) => {
  const snapshot = useSnapshot(treeDataState);
  const node = snapshot.nodes[nodeId];

  return (
    <div>
      {node.name}
      {node.children.map(childId => (
        <TreeNode key={childId} nodeId={childId} />
      ))}
    </div>
  );
};

const Tree = () => {
  const snapshot = useSnapshot(treeDataState);

  return (
    <div>
      {snapshot.rootNodes.map(rootId => (
        <TreeNode key={rootId} nodeId={rootId} />
      ))}
    </div>
  );
};
```

在这个示例中，`treeDataState` 是一个存储树节点数据的状态对象。`Tree` 组件和 `TreeNode` 组件根据这个状态对象来渲染树结构，而不是将数据嵌入到组件内部。

通过这种方式，可以更轻松地管理和优化数据变化，提升应用性能和可维护性。