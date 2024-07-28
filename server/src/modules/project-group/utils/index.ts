import { ProjectGroup } from '@prisma/client';
import { ProjectGroupResponseDto } from '../dtos';

export function toProjectGroupDto(
  projectGroup: ProjectGroup,
): ProjectGroupResponseDto {
  return {
    id: projectGroup.id,
    name: projectGroup.name,
    parentGroupId: projectGroup.parentGroupId ?? undefined,
    ownerId: projectGroup.ownerId,
    createdAt: projectGroup.createdAt.toISOString(),
    updatedAt: projectGroup.updatedAt.toISOString(),
  };
}
