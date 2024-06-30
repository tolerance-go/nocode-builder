import { ProjectOperationModel } from './ProjectOperationModel';

export class ProjectCreateOperationModel {
  id: number;
  recordId: number;
  createdAt: Date;
  updatedAt: Date;
  projectOperation: ProjectOperationModel;
  projectOperationId: number;

  constructor({
    id,
    recordId,
    createdAt,
    updatedAt,
    projectOperation,
    projectOperationId,
  }: {
    id: number;
    recordId: number;
    createdAt: Date;
    updatedAt: Date;
    projectOperation: ProjectOperationModel;
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
