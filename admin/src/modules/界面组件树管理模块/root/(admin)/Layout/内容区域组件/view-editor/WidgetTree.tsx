import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';

const treeData: DataNode[] = [
  {
    title: '根节点',
    key: '0-0',
    children: [
      {
        title: '子节点1',
        key: '0-0-0',
        children: [
          {
            title: 'children',
            key: 'c1',
            children: [
              {
                title: '子子节点1',
                key: '0-0-0-0',
              },
              {
                title: '子子节点2',
                key: '0-0-0-1',
              },
            ],
          },
        ],
      },
      {
        title: '子节点2',
        key: '0-0-1',
        children: [
          {
            title: 'header',
            key: 'c1',
            children: [
              {
                title: '子子节点3',
                key: '0-0-1-0',
              },
            ],
          },
          {
            title: 'bottom',
            key: 'c2',
            children: [
              {
                title: '子子节点4',
                key: '0-0-1-0',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const WidgetTree = () => {
  return <Tree treeData={treeData} blockNode />;
};
