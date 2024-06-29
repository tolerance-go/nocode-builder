import { TimeNode } from '@prisma/client';
import { TimeNodeDto } from '../dtos/time-node.dto';

export function toTimeNodeDto(timeNode: TimeNode): TimeNodeDto {
  return {
    id: timeNode.id,
    name: timeNode.name,
    parentGroupId: timeNode.parentGroupId ?? undefined,
    ownerId: timeNode.ownerId,
    createdAt: timeNode.createdAt.toISOString(),
    updatedAt: timeNode.updatedAt.toISOString(),
  };
}
