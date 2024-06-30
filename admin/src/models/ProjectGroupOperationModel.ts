import { ProjectGroupModel } from "./ProjectGroupModel";
import { TimeNodeModel } from "./TimeNodeModel";
import { ProjectGroupCreateOperationModel } from "./ProjectGroupCreateOperationModel";
import { ProjectGroupUpdateOperationModel } from "./ProjectGroupUpdateOperationModel";
import { ProjectGroupDeleteOperationModel } from "./ProjectGroupDeleteOperationModel";

export class ProjectGroupOperationModel {
  id: number;
  projectGroupId: number;
  projectGroup: ProjectGroupModel;
  projectGroupCreateOperationId?: number;
  projectGroupUpdateOperationId?: number;
  projectGroupDeleteOperationId?: number;
  timeNode?: TimeNodeModel;
  projectGroupCreateOperation?: ProjectGroupCreateOperationModel;
  projectGroupUpdateOperation?: ProjectGroupUpdateOperationModel;
  projectGroupDeleteOperation?: ProjectGroupDeleteOperationModel;

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
    projectGroup: ProjectGroupModel;
    projectGroupCreateOperationId?: number;
    projectGroupUpdateOperationId?: number;
    projectGroupDeleteOperationId?: number;
    timeNode?: TimeNodeModel;
    projectGroupCreateOperation?: ProjectGroupCreateOperationModel;
    projectGroupUpdateOperation?: ProjectGroupUpdateOperationModel;
    projectGroupDeleteOperation?: ProjectGroupDeleteOperationModel;
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
