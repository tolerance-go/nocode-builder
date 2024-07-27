import { ViewKey } from '@/common/types';
import { ProjectType } from '@/modules/界面组件树管理模块';
import { TreeDataNode } from 'antd';

export interface ProjectStructureTreeDataNode extends TreeDataNode {
  key: ViewKey;
  children?: ProjectStructureTreeDataNode[];
}

type ProjectTreeNodeDataRecordItemBase = {
  title: string;
  id: number;
};

export type DirectoryTreeNodeType = DirectoryTreeNodeTypeEnum;

export enum DirectoryTreeNodeTypeEnum {
  Folder = 'folder',
  File = 'file',
}
export type ProjectTreeNodeFolderDataRecordItem = {
  type: DirectoryTreeNodeTypeEnum.Folder;
} & ProjectTreeNodeDataRecordItemBase;

export type ProjectTreeNodeFileDataRecordItem = {
  type: DirectoryTreeNodeTypeEnum.File;
  projectType: ProjectType;
} & ProjectTreeNodeDataRecordItemBase;

export type ProjectTreeNodeDataRecordItem =
  | ProjectTreeNodeFolderDataRecordItem
  | ProjectTreeNodeFileDataRecordItem;

/** key 到树节点数据的映射 */
export type ProjectTreeNodeDataRecord = Record<
  string,
  ProjectTreeNodeDataRecordItem
>;
