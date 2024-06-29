import { TimeNode } from '@prisma/client';
import { TimeNodeDto } from '../dtos/time-node.dto';

export function toTimeNodeDto(timeNode: TimeNode): TimeNodeDto {
  return {
    id: timeNode.id,
    timeChunkId: timeNode.timeChunkId,
    projectOperationId: timeNode.projectOperationId ?? undefined,
    projectGroupOperationId: timeNode.projectGroupOperationId ?? undefined,
    createdAt: timeNode.createdAt.toISOString(),
    updatedAt: timeNode.updatedAt.toISOString(),
  };
}
