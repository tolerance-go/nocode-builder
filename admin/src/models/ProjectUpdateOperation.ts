import { ProjectOperation } from './ProjectOperation';

export class ProjectUpdateOperation {
  id: number;
  recordId: number;
  createdAt: Date;
  updatedAt: Date;
  projectOperation: ProjectOperation;
  projectOperationId: number;

  constructor({
    id,
    recordId,
    createdAt,
    updatedAt,
    projectOperation,
    projectOperationId
  }: {
    id: number;
    recordId: number;
    createdAt: Date;
    updatedAt: Date;
    projectOperation: ProjectOperation;
    projectOperationId: number;
  }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectOperation = projectOperation;
    this.projectOperationId = projectOperationId;
  }
}
