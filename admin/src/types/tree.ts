import { ProjectFileType } from '@/core/managers/UITreeManager/types';
import { TreeDataNode } from 'antd';

export interface ProjectStructureTreeDataNode extends TreeDataNode {
  isLeaf?: boolean;
  key: string;
  children?: ProjectStructureTreeDataNode[];
}

export type ProjectTreeNodeDataRecordItem = {
  title: string;
  id: number;
  type: 'file' | 'folder';
  projectFileType?: ProjectFileType;
};

/** key 到树节点数据的映射 */
export type ProjectTreeNodeDataRecord = Record<
  string,
  ProjectTreeNodeDataRecordItem
>;
