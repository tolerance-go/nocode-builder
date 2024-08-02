import { Project } from '@prisma/client';
import { ProjectResponseDto } from '../dtos';

export function toProjectDto(project: Project): ProjectResponseDto {
  return {
    id: project.id,
    name: project.name,
    projectGroupId: project.projectGroupId ?? undefined,
    ownerId: project.ownerId,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
    type: project.type,
    projectDetailId: project.projectDetailId,
  };
}
