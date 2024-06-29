import { ProjectCreateOperation } from '@prisma/client';
import { ProjectCreateOperationDto } from '../dtos/project-create-operation.dto';

export function toProjectCreateOperationDto(projectCreateOperation: ProjectCreateOperation): ProjectCreateOperationDto {
  return {
    id: projectCreateOperation.id,
    name: projectCreateOperation.name,
    parentGroupId: projectCreateOperation.parentGroupId ?? undefined,
    ownerId: projectCreateOperation.ownerId,
    createdAt: projectCreateOperation.createdAt.toISOString(),
    updatedAt: projectCreateOperation.updatedAt.toISOString(),
  };
}
