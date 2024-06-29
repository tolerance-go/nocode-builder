import { ProjectGroupCreateOperation } from '@prisma/client';
import { ProjectGroupCreateOperationDto } from '../dtos/project-group-create-operation.dto';

export function toProjectGroupCreateOperationDto(projectGroupCreateOperation: ProjectGroupCreateOperation): ProjectGroupCreateOperationDto {
  return {
    id: projectGroupCreateOperation.id,
    name: projectGroupCreateOperation.name,
    parentGroupId: projectGroupCreateOperation.parentGroupId ?? undefined,
    ownerId: projectGroupCreateOperation.ownerId,
    createdAt: projectGroupCreateOperation.createdAt.toISOString(),
    updatedAt: projectGroupCreateOperation.updatedAt.toISOString(),
  };
}
