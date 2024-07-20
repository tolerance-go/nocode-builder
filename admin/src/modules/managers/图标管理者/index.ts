import { ManagerBase } from '@/base';
import {
  BuildOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  PartitionOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { createElement } from 'react';
import { 图标id到组件的映射, 图标组件id联合 } from './types';

export class 图标管理者 extends ManagerBase {
  requires(): this {
    return super.requireModules();
  }

  public static 跟随组件id到组件映射: 图标id到组件的映射 = {
    视图项目节点: BuildOutlined,
    数据表项目节点: TableOutlined,
    蓝图项目节点: PartitionOutlined,
    项目组文件夹: FolderOutlined,
    项目组文件夹展开中: FolderOpenOutlined,
  };

  根据id获取组件<ID extends 图标组件id联合>(id: ID, props?: AntdIconProps) {
    const Component = 图标管理者.跟随组件id到组件映射[id];
    return createElement(Component, props);
  }
}
