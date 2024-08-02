import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

type AntdIcon = React.ForwardRefExoticComponent<
  Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
>;

export type 图标id到组件的映射 = {
  视图项目节点: AntdIcon;
  数据表项目节点: AntdIcon;
  蓝图项目节点: AntdIcon;
  项目组文件夹: AntdIcon;
  项目组文件夹展开中: AntdIcon;
  PcWeb平台logo: AntdIcon;
  MobileWeb平台logo: AntdIcon;
  MiniProgram平台logo: AntdIcon;
  NativeMobile平台logo: AntdIcon;
  DesktopClient平台logo: AntdIcon;
};

export type 图标组件id联合 = keyof 图标id到组件的映射;

export type 图标组件过id获取<ID extends 图标组件id联合> =
  图标id到组件的映射[ID];
