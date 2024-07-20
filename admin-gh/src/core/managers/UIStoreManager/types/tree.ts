import { ProjectFileType } from '@/core/managers/UITreeManager';
import { TreeDataNode } from 'antd';

export interface ProjectStructureTreeDataNode extends TreeDataNode {
  isLeaf?: boolean;
  key: string;
  children?: ProjectStructureTreeDataNode[];
}

type ProjectTreeNodeDataRecordItemBase = {
  title: string;
  id: number;
};

export type ProjectTreeNodeFolderDataRecordItem = {
  type: 'folder';
} & ProjectTreeNodeDataRecordItemBase;

export type ProjectTreeNodeFileDataRecordItem = {
  type: 'file';
  projectFileType: ProjectFileType;
} & ProjectTreeNodeDataRecordItemBase;

export type ProjectTreeNodeDataRecordItem =
  | ProjectTreeNodeFolderDataRecordItem
  | ProjectTreeNodeFileDataRecordItem;

/** key 到树节点数据的映射 */
export type ProjectTreeNodeDataRecord = Record<
  string,
  ProjectTreeNodeDataRecordItem
>;
