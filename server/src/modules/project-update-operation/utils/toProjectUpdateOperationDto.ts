import { ProjectUpdateOperation } from '@prisma/client';
import { ProjectUpdateOperationDto } from '../dtos/project-update-operation.dto';

export function toProjectUpdateOperationDto(projectUpdateOperation: ProjectUpdateOperation): ProjectUpdateOperationDto {
  return {
    id: projectUpdateOperation.id,
    name: projectUpdateOperation.name,
    parentGroupId: projectUpdateOperation.parentGroupId ?? undefined,
    ownerId: projectUpdateOperation.ownerId,
    createdAt: projectUpdateOperation.createdAt.toISOString(),
    updatedAt: projectUpdateOperation.updatedAt.toISOString(),
  };
}
