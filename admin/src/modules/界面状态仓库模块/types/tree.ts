import { WidgetPlatformTypeEnum } from '@/_gen/models';
import { ViewKey } from '@/common/types';
import { ProjectType } from '@/modules/界面组件树管理模块';
import { TreeDataNode } from 'antd';

export interface ProjectTreeDataNode extends TreeDataNode {
  key: ViewKey;
  children?: ProjectTreeDataNode[];
}

export type ProjectTreeNodeDataBase = {
  title: string;
  // 内存数据库和远程数据库的 id 关联
  recordId?: number;
};

export type DirectoryTreeNodeType = DirectoryTreeNodeTypeEnum;

export enum DirectoryTreeNodeTypeEnum {
  Folder = 'folder',
  File = 'file',
}
export type ProjectTreeNodeFolderData = {
  type: DirectoryTreeNodeTypeEnum.Folder;
} & ProjectTreeNodeDataBase;

export type ProjectTreeNodeFileDataRecordItem = {
  type: DirectoryTreeNodeTypeEnum.File;
  projectType: ProjectType;
} & ProjectTreeNodeDataBase;

export type ProjectTreeNodeData =
  | ProjectTreeNodeFolderData
  | ProjectTreeNodeFileDataRecordItem;

/** key 到树节点数据的映射 */
export type ProjectTreeNodeDataRecord = Record<string, ProjectTreeNodeData>;

// ====================== 视图部件树 ======================

export interface WidgetStructureTreeDataNode extends TreeDataNode {
  key: ViewKey;
  type: WidgetTreeNodeType;
  children?: WidgetStructureTreeDataNode[];
}

export interface WidgetTreeDataNode extends TreeDataNode {
  key: ViewKey;
  type: WidgetTreeNodeType.Widget;
  children?: WidgetSlotTreeDataNode[];
}

export interface WidgetSlotTreeDataNode extends TreeDataNode {
  key: ViewKey;
  type: WidgetTreeNodeType.Slot;
  children?: WidgetTreeDataNode[];
}

export enum WidgetTreeNodeType {
  Widget = 'widget',
  Slot = 'slot',
}

export type WidgetTreeNodeDataBase = {
  type: WidgetTreeNodeType;
  title: string;
  recordId?: number;
};

export type WidgetTreeNodeData = {
  type: WidgetTreeNodeType.Widget;
} & WidgetTreeNodeDataBase;

export type WidgetSlotTreeNodeData = {
  type: WidgetTreeNodeType.Slot;
} & WidgetTreeNodeDataBase;

export type WidgetTreeNodeDataRecordItem =
  | WidgetTreeNodeData
  | WidgetSlotTreeNodeData;

/** key 到树节点数据的映射 */
export type WidgetTreeNodeDataRecord = Record<
  string,
  WidgetTreeNodeDataRecordItem
>;
