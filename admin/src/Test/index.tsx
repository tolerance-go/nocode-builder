// import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// export const Test = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />}>
//           <Route path="about" element={<About />} />
//           <Route path="contact" element={<Contact />} />
//         </Route>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// // 示例 Home 组件
// const Home = () => {
//   return (
//     <div>
//       <h1>欢迎来到主页</h1>
//       <Outlet />
//     </div>
//   );
// };

// // 示例 About 组件
// const About = () => {
//   return (
//     <div>
//       <h1>关于我们</h1>
//     </div>
//   );
// };

// // 示例 Contact 组件
// const Contact = () => {
//   return (
//     <div>
//       <h1>联系我们</h1>
//     </div>
//   );
// };

// // 示例 NotFound 组件
// const NotFound = () => {
//   return (
//     <div>
//       <h1>404 未找到</h1>
//     </div>
//   );
// };

import React from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
];

const App: React.FC = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <Tree
      checkable
      defaultExpandedKeys={['0-0-0', '0-0-1']}
      defaultSelectedKeys={['0-0-0', '0-0-1']}
      defaultCheckedKeys={['0-0-0', '0-0-1']}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
    />
  );
};

export default App;