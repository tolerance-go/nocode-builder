import { ProjectModel } from './ProjectModel';
import { TimeNodeModel } from './TimeNodeModel';
import { ProjectUpdateOperationModel } from './ProjectUpdateOperationModel';
import { ProjectDeleteOperationModel } from './ProjectDeleteOperationModel';
import { ProjectCreateOperationModel } from './ProjectCreateOperationModel';

export class ProjectOperationModel {
  id: number;
  projectId: number;
  project: ProjectModel;
  projectCreateOperationId?: number;
  projectUpdateOperationId?: number;
  projectDeleteOperationId?: number;
  timeNode?: TimeNodeModel;
  projectUpdateOperation?: ProjectUpdateOperationModel;
  projectDeleteOperation?: ProjectDeleteOperationModel;
  projectCreateOperation?: ProjectCreateOperationModel;

  constructor({
    id,
    projectId,
    project,
    projectCreateOperationId,
    projectUpdateOperationId,
    projectDeleteOperationId,
    timeNode,
    projectUpdateOperation,
    projectDeleteOperation,
    projectCreateOperation
  }: {
    id: number;
    projectId: number;
    project: ProjectModel;
    projectCreateOperationId?: number;
    projectUpdateOperationId?: number;
    projectDeleteOperationId?: number;
    timeNode?: TimeNodeModel;
    projectUpdateOperation?: ProjectUpdateOperationModel;
    projectDeleteOperation?: ProjectDeleteOperationModel;
    projectCreateOperation?: ProjectCreateOperationModel;
  }) {
    this.id = id;
    this.projectId = projectId;
    this.project = project;
    this.projectCreateOperationId = projectCreateOperationId;
    this.projectUpdateOperationId = projectUpdateOperationId;
    this.projectDeleteOperationId = projectDeleteOperationId;
    this.timeNode = timeNode;
    this.projectUpdateOperation = projectUpdateOperation;
    this.projectDeleteOperation = projectDeleteOperation;
    this.projectCreateOperation = projectCreateOperation;
  }
}
