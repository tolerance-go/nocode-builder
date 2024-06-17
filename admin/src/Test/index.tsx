// // import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// // export const Test = () => {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<Home />}>
// //           <Route path="about" element={<About />} />
// //           <Route path="contact" element={<Contact />} />
// //         </Route>
// //         <Route path="*" element={<NotFound />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // };

// // // 示例 Home 组件
// // const Home = () => {
// //   return (
// //     <div>
// //       <h1>欢迎来到主页</h1>
// //       <Outlet />
// //     </div>
// //   );
// // };

// // // 示例 About 组件
// // const About = () => {
// //   return (
// //     <div>
// //       <h1>关于我们</h1>
// //     </div>
// //   );
// // };

// // // 示例 Contact 组件
// // const Contact = () => {
// //   return (
// //     <div>
// //       <h1>联系我们</h1>
// //     </div>
// //   );
// // };

// // // 示例 NotFound 组件
// // const NotFound = () => {
// //   return (
// //     <div>
// //       <h1>404 未找到</h1>
// //     </div>
// //   );
// // };

// import React from 'react';
// import { Tree } from 'antd';
// import type { TreeDataNode, TreeProps } from 'antd';

// const treeData: TreeDataNode[] = [
//   {
//     title: 'parent 1',
//     key: '0-0',
//     children: [
//       {
//         title: 'parent 1-0',
//         key: '0-0-0',
//         disabled: true,
//         children: [
//           {
//             title: 'leaf',
//             key: '0-0-0-0',
//             disableCheckbox: true,
//           },
//           {
//             title: 'leaf',
//             key: '0-0-0-1',
//           },
//         ],
//       },
//       {
//         title: 'parent 1-1',
//         key: '0-0-1',
//         children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
//       },
//     ],
//   },
// ];

// const App: React.FC = () => {
//   const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
//     console.log('selected', selectedKeys, info);
//   };

//   const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
//     console.log('onCheck', checkedKeys, info);
//   };

//   return (
//     <Tree
//       checkable
//       defaultExpandedKeys={['0-0-0', '0-0-1']}
//       defaultSelectedKeys={['0-0-0', '0-0-1']}
//       defaultCheckedKeys={['0-0-0', '0-0-1']}
//       onSelect={onSelect}
//       onCheck={onCheck}
//       treeData={treeData}
//     />
//   );
// };

// export default App;

import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';

const { Search } = Input;

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
  },
];

const App: React.FC = () => (
  <Space direction="vertical" size="middle">
    <Space.Compact>
      <Input defaultValue="26888888" />
    </Space.Compact>
    <Space.Compact>
      <Input style={{ width: '20%' }} defaultValue="0571" />
      <Input style={{ width: '80%' }} defaultValue="26888888" />
    </Space.Compact>
    <Space.Compact>
      <Search addonBefore="https://" placeholder="input search text" allowClear />
    </Space.Compact>
    <Space.Compact style={{ width: '100%' }}>
      <Input defaultValue="Combine input and button" />
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <Space.Compact>
      <Select defaultValue="Zhejiang" options={options} />
      <Input defaultValue="Xihu District, Hangzhou" />
    </Space.Compact>
    <Space.Compact size="large">
      <Input addonBefore={<SearchOutlined />} placeholder="large size" />
      <Input placeholder="another input" />
    </Space.Compact>
  </Space>
);

export default App;