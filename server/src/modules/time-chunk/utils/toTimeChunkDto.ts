import { TimeChunk } from '@prisma/client';
import { TimeChunkDto } from '../dtos/time-chunk.dto';

export function toTimeChunkDto(timeChunk: TimeChunk): TimeChunkDto {
  return {
    id: timeChunk.id,
    name: timeChunk.name,
    parentGroupId: timeChunk.parentGroupId ?? undefined,
    ownerId: timeChunk.ownerId,
    createdAt: timeChunk.createdAt.toISOString(),
    updatedAt: timeChunk.updatedAt.toISOString(),
  };
}
