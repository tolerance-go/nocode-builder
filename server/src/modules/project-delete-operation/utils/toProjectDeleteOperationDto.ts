import { ProjectDeleteOperation } from '@prisma/client';
import { ProjectDeleteOperationDto } from '../dtos/project-delete-operation.dto';

export function toProjectDeleteOperationDto(projectDeleteOperation: ProjectDeleteOperation): ProjectDeleteOperationDto {
  return {
    id: projectDeleteOperation.id,
    name: projectDeleteOperation.name,
    parentGroupId: projectDeleteOperation.parentGroupId ?? undefined,
    ownerId: projectDeleteOperation.ownerId,
    createdAt: projectDeleteOperation.createdAt.toISOString(),
    updatedAt: projectDeleteOperation.updatedAt.toISOString(),
  };
}
