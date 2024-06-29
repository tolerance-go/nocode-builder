import { ProjectOperation } from '@prisma/client';
import { ProjectOperationDto } from '../dtos/project-operation.dto';

export function toProjectOperationDto(projectOperation: ProjectOperation): ProjectOperationDto {
  return {
    id: projectOperation.id,
    name: projectOperation.name,
    parentGroupId: projectOperation.parentGroupId ?? undefined,
    ownerId: projectOperation.ownerId,
    createdAt: projectOperation.createdAt.toISOString(),
    updatedAt: projectOperation.updatedAt.toISOString(),
  };
}
