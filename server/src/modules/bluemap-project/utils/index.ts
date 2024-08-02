import { BluemapProject } from '@prisma/client';
import { BluemapProjectResponseDto } from '../dtos';

export function toBluemapProjectDto(
  record: BluemapProject,
): BluemapProjectResponseDto {
  return {
    id: record.id,
    ownerId: record.ownerId,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
