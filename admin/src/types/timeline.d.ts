import { DeepReadonly } from "@/utils";

export type ProjectTreeTimelineNode = {
  treeData: DeepReadonly<ProjectTreeDataNode[]>;
  createdAt: Date;
  updatedAt?: Date;
};
