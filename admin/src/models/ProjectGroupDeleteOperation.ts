import { ProjectGroupOperation } from './ProjectGroupOperation';

export class ProjectGroupDeleteOperation {
  id: number;
  recordId: number;
  createdAt: Date;
  updatedAt: Date;
  projectGroupOperation: ProjectGroupOperation;
  projectGroupOperationId: number;

  constructor({
    id,
    recordId,
    createdAt,
    updatedAt,
    projectGroupOperation,
    projectGroupOperationId
  }: {
    id: number;
    recordId: number;
    createdAt: Date;
    updatedAt: Date;
    projectGroupOperation: ProjectGroupOperation;
    projectGroupOperationId: number;
  }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroupOperation = projectGroupOperation;
    this.projectGroupOperationId = projectGroupOperationId;
  }
}
