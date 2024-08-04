import { EngineBase, ModuleBase } from '@/base';
import {
  BuildOutlined,
  DesktopOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  MobileOutlined,
  PartitionOutlined,
  TableOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { createElement } from 'react';
import { 图标id到组件的映射, 图标组件id联合 } from './types';

export class 界面界面图标管理者 extends ModuleBase {
  public static 跟随组件id到组件映射: 图标id到组件的映射 = {
    视图项目节点: BuildOutlined,
    数据表项目节点: TableOutlined,
    蓝图项目节点: PartitionOutlined,
    项目组文件夹: FolderOutlined,
    项目组文件夹展开中: FolderOpenOutlined,
    PcWeb平台logo: DesktopOutlined,
    MobileWeb平台logo: MobileOutlined,
    MiniProgram平台logo: TabletOutlined,
    NativeMobile平台logo: MobileOutlined,
    DesktopClient平台logo: DesktopOutlined,
  };

  private static instance: 界面界面图标管理者;

  public static getInstance(engine: EngineBase): 界面界面图标管理者 {
    if (!界面界面图标管理者.instance) {
      界面界面图标管理者.instance = new 界面界面图标管理者(engine);
    }

    return 界面界面图标管理者.instance;
  }

  根据id获取组件<ID extends 图标组件id联合>(id: ID, props?: AntdIconProps) {
    const Component = 界面界面图标管理者.跟随组件id到组件映射[id];
    return createElement(Component, props);
  }
}
