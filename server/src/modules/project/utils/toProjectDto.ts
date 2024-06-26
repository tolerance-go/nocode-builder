import { Project } from '@prisma/client';
import { ProjectDto } from '../dtos';

export function toProjectDto(project: Project): ProjectDto {
  return {
    id: project.id,
    name: project.name,
    projectGroupId: project.projectGroupId ?? undefined,
    ownerId: project.ownerId,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}
