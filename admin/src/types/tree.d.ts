export type ProjectStructureTreeDataNode = {
  // @TODO 准备去除
  title: string;
  id: number;
  key: string;
  children?: ProjectStructureTreeDataNode[];
  type: "file" | "folder";
};

/** key 到树节点数据的映射 */
export type ProjectStructureTreeNodeDataRecord = {
  [key: string]: {
    title: string;
    id: number;
    type: "file" | "folder";
  };
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
