import { ProjectGroupDeleteOperation } from '@prisma/client';
import { ProjectGroupDeleteOperationDto } from '../dtos/project-group-delete-operation.dto';

export function toProjectGroupDeleteOperationDto(projectGroupDeleteOperation: ProjectGroupDeleteOperation): ProjectGroupDeleteOperationDto {
  return {
    id: projectGroupDeleteOperation.id,
    name: projectGroupDeleteOperation.name,
    parentGroupId: projectGroupDeleteOperation.parentGroupId ?? undefined,
    ownerId: projectGroupDeleteOperation.ownerId,
    createdAt: projectGroupDeleteOperation.createdAt.toISOString(),
    updatedAt: projectGroupDeleteOperation.updatedAt.toISOString(),
  };
}
