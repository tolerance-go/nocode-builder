import { ProjectCreateOperation } from '@prisma/client';
import { ProjectCreateOperationDto } from '../dtos/project-create-operation.dto';

export function toProjectCreateOperationDto(
  projectCreateOperation: ProjectCreateOperation,
): ProjectCreateOperationDto {
  return {
    id: projectCreateOperation.id,
    recordId: projectCreateOperation.recordId,
    createdAt: projectCreateOperation.createdAt.toISOString(),
    updatedAt: projectCreateOperation.updatedAt.toISOString(),
    projectOperationId: projectCreateOperation.projectOperationId,
  };
}
