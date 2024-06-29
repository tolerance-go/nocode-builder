import { TimeChunk } from '@prisma/client';
import { TimeChunkDto } from '../dtos/time-chunk.dto';

export function toTimeChunkDto(timeChunk: TimeChunk): TimeChunkDto {
  return {
    id: timeChunk.id,
    name: timeChunk.name,
    description: timeChunk.description ?? undefined,
    userId: timeChunk.userId,
    createdAt: timeChunk.createdAt.toISOString(),
    updatedAt: timeChunk.updatedAt.toISOString(),
  };
}
