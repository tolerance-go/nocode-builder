import { TimeChunkModel } from './TimeChunkModel';
import { ProjectOperationModel } from './ProjectOperationModel';
import { ProjectGroupOperationModel } from './ProjectGroupOperationModel';

export class TimeNodeModel {
  id: number;
  timeChunkId: number;
  timeChunk: TimeChunkModel;
  projectOperationId?: number;
  projectOperation?: ProjectOperationModel;
  projectGroupOperationId?: number;
  projectGroupOperation?: ProjectGroupOperationModel;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    timeChunkId,
    timeChunk,
    projectOperationId,
    projectOperation,
    projectGroupOperationId,
    projectGroupOperation,
    createdAt,
    updatedAt,
  }: {
    id: number;
    timeChunkId: number;
    timeChunk: TimeChunkModel;
    projectOperationId?: number;
    projectOperation?: ProjectOperationModel;
    projectGroupOperationId?: number;
    projectGroupOperation?: ProjectGroupOperationModel;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.timeChunkId = timeChunkId;
    this.timeChunk = timeChunk;
    this.projectOperationId = projectOperationId;
    this.projectOperation = projectOperation;
    this.projectGroupOperationId = projectGroupOperationId;
    this.projectGroupOperation = projectGroupOperation;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
