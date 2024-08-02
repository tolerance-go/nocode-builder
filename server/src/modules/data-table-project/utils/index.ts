import { DataTableProject } from '@prisma/client';
import { DataTableProjectResponseDto } from '../dtos';

export function toDataTableProjectDto(
  record: DataTableProject,
): DataTableProjectResponseDto {
  return {
    id: record.id,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
    ownerId: record.ownerId,
  };
}
