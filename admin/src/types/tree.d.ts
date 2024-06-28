export type ProjectStructureTreeDataNode = {
  isLeaf?: boolean;
  key: string;
  children?: ProjectStructureTreeDataNode[];
};

export type ProjectTreeNodeDataRecordItem = {
  title: string;
  id: number;
  type: "file" | "folder";
};

/** key 到树节点数据的映射 */
export type ProjectTreeNodeDataRecord = {
  [key: string]: ProjectTreeNodeDataRecordItem;
};

export type ProjectTreeCompareResult = {
  added: ProjectStructureTreeDataNode[];
  removed: ProjectStructureTreeDataNode[];
  moved: {
    node: ProjectStructureTreeDataNode;
    oldParent: ProjectStructureTreeDataNode | null;
    newParent: ProjectStructureTreeDataNode | null;
  }[];
  updated: {
    oldNode: ProjectStructureTreeDataNode;
    newNode: ProjectStructureTreeDataNode;
  }[];
};
