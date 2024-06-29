import { ProjectGroupUpdateOperation } from '@prisma/client';
import { ProjectGroupUpdateOperationDto } from '../dtos/project-group-update-operation.dto';

export function toProjectGroupUpdateOperationDto(projectGroupUpdateOperation: ProjectGroupUpdateOperation): ProjectGroupUpdateOperationDto {
  return {
    id: projectGroupUpdateOperation.id,
    name: projectGroupUpdateOperation.name,
    parentGroupId: projectGroupUpdateOperation.parentGroupId ?? undefined,
    ownerId: projectGroupUpdateOperation.ownerId,
    createdAt: projectGroupUpdateOperation.createdAt.toISOString(),
    updatedAt: projectGroupUpdateOperation.updatedAt.toISOString(),
  };
}
