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

export type ProjectTreeNodeDataRecordItem =
  | ({
      type: 'folder';
    } & ProjectTreeNodeDataRecordItemBase)
  | ({
      type: 'file';
      projectFileType: ProjectFileType;
    } & ProjectTreeNodeDataRecordItemBase);

/** key 到树节点数据的映射 */
export type ProjectTreeNodeDataRecord = Record<
  string,
  ProjectTreeNodeDataRecordItem
>;
