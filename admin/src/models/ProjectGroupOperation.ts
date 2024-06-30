import { ProjectGroup } from "./ProjectGroup";
import { TimeNode } from "./TimeNode";
import { ProjectGroupCreateOperation } from "./ProjectGroupCreateOperation";
import { ProjectGroupUpdateOperation } from "./ProjectGroupUpdateOperation";
import { ProjectGroupDeleteOperation } from "./ProjectGroupDeleteOperation";

export class ProjectGroupOperation {
  id: number;
  projectGroupId: number;
  projectGroup: ProjectGroup;
  projectGroupCreateOperationId?: number;
  projectGroupUpdateOperationId?: number;
  projectGroupDeleteOperationId?: number;
  timeNode?: TimeNode;
  projectGroupCreateOperation?: ProjectGroupCreateOperation;
  projectGroupUpdateOperation?: ProjectGroupUpdateOperation;
  projectGroupDeleteOperation?: ProjectGroupDeleteOperation;

  constructor({
    id,
    projectGroupId,
    projectGroup,
    projectGroupCreateOperationId,
    projectGroupUpdateOperationId,
    projectGroupDeleteOperationId,
    timeNode,
    projectGroupCreateOperation,
    projectGroupUpdateOperation,
    projectGroupDeleteOperation,
  }: {
    id: number;
    projectGroupId: number;
    projectGroup: ProjectGroup;
    projectGroupCreateOperationId?: number;
    projectGroupUpdateOperationId?: number;
    projectGroupDeleteOperationId?: number;
    timeNode?: TimeNode;
    projectGroupCreateOperation?: ProjectGroupCreateOperation;
    projectGroupUpdateOperation?: ProjectGroupUpdateOperation;
    projectGroupDeleteOperation?: ProjectGroupDeleteOperation;
  }) {
    this.id = id;
    this.projectGroupId = projectGroupId;
    this.projectGroup = projectGroup;
    this.projectGroupCreateOperationId = projectGroupCreateOperationId;
    this.projectGroupUpdateOperationId = projectGroupUpdateOperationId;
    this.projectGroupDeleteOperationId = projectGroupDeleteOperationId;
    this.timeNode = timeNode;
    this.projectGroupCreateOperation = projectGroupCreateOperation;
    this.projectGroupUpdateOperation = projectGroupUpdateOperation;
    this.projectGroupDeleteOperation = projectGroupDeleteOperation;
  }
}
