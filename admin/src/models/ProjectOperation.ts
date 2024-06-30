import { Project } from './Project';
import { TimeNode } from './TimeNode';
import { ProjectUpdateOperation } from './ProjectUpdateOperation';
import { ProjectDeleteOperation } from './ProjectDeleteOperation';
import { ProjectCreateOperation } from './ProjectCreateOperation';

export class ProjectOperation {
  id: number;
  projectId: number;
  project: Project;
  projectCreateOperationId?: number;
  projectUpdateOperationId?: number;
  projectDeleteOperationId?: number;
  timeNode?: TimeNode;
  projectUpdateOperation?: ProjectUpdateOperation;
  projectDeleteOperation?: ProjectDeleteOperation;
  projectCreateOperation?: ProjectCreateOperation;

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
    project: Project;
    projectCreateOperationId?: number;
    projectUpdateOperationId?: number;
    projectDeleteOperationId?: number;
    timeNode?: TimeNode;
    projectUpdateOperation?: ProjectUpdateOperation;
    projectDeleteOperation?: ProjectDeleteOperation;
    projectCreateOperation?: ProjectCreateOperation;
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
