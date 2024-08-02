import { ViewProject } from '@prisma/client';
import { ViewProjectResponseDto } from '../dtos';

export function toViewProjectDto(record: ViewProject): ViewProjectResponseDto {
  return {
    id: record.id,
    platformType: record.platformType,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
