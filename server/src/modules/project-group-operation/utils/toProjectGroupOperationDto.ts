import { ProjectGroupOperation } from '@prisma/client';
import { ProjectGroupOperationDto } from '../dtos/project-group-operation.dto';

export function toProjectGroupOperationDto(projectGroupOperation: ProjectGroupOperation): ProjectGroupOperationDto {
  return {
    id: projectGroupOperation.id,
    name: projectGroupOperation.name,
    parentGroupId: projectGroupOperation.parentGroupId ?? undefined,
    ownerId: projectGroupOperation.ownerId,
    createdAt: projectGroupOperation.createdAt.toISOString(),
    updatedAt: projectGroupOperation.updatedAt.toISOString(),
  };
}
