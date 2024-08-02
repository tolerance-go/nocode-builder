import { BluemapProject } from '@prisma/client';
import { BluemapProjectResponseDto } from '../dtos';

export function toBluemapProjectDto(
  record: BluemapProject,
): BluemapProjectResponseDto {
  return {
    id: record.id,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
