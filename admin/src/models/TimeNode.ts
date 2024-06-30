import { TimeChunk } from './TimeChunk';
import { ProjectOperation } from './ProjectOperation';
import { ProjectGroupOperation } from './ProjectGroupOperation';

export class TimeNode {
  id: number;
  timeChunkId: number;
  timeChunk: TimeChunk;
  projectOperationId?: number;
  projectOperation?: ProjectOperation;
  projectGroupOperationId?: number;
  projectGroupOperation?: ProjectGroupOperation;
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
    updatedAt
  }: {
    id: number;
    timeChunkId: number;
    timeChunk: TimeChunk;
    projectOperationId?: number;
    projectOperation?: ProjectOperation;
    projectGroupOperationId?: number;
    projectGroupOperation?: ProjectGroupOperation;
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
