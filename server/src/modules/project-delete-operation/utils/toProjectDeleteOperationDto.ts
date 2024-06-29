import { ProjectDeleteOperation } from '@prisma/client';
import { ProjectDeleteOperationDto } from '../dtos/project-delete-operation.dto';

export function toProjectDeleteOperationDto(
  projectDeleteOperation: ProjectDeleteOperation,
): ProjectDeleteOperationDto {
  return {
    id: projectDeleteOperation.id,
    recordId: projectDeleteOperation.recordId,
    createdAt: projectDeleteOperation.createdAt.toISOString(),
    updatedAt: projectDeleteOperation.updatedAt.toISOString(),
    projectOperationId: projectDeleteOperation.projectOperationId,
  };
}
