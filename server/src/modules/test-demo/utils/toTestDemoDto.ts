import { ProjectGroup } from '@prisma/client';
import { ProjectGroupDto } from '../dtos/test-demo.dto';

export function toProjectGroupDto(projectGroup: ProjectGroup): ProjectGroupDto {
  return {
    id: projectGroup.id,
    name: projectGroup.name,
    parentGroupId: projectGroup.parentGroupId ?? undefined,
    ownerId: projectGroup.ownerId,
    createdAt: projectGroup.createdAt.toISOString(),
    updatedAt: projectGroup.updatedAt.toISOString(),
  };
}
