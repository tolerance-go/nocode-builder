import { ProjectDetail } from '@prisma/client';
import { ProjectDetailResponseDto } from '../dtos';

export function toProjectDetailDto(
  record: ProjectDetail,
): ProjectDetailResponseDto {
  return {
    viewProjectId: record.viewProjectId ?? undefined,
    dataTableProjectId: record.dataTableProjectId ?? undefined,
    bluemapProjectId: record.bluemapProjectId ?? undefined,
    id: record.id,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
