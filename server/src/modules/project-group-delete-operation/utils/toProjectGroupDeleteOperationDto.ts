import { ProjectGroupDeleteOperation } from '@prisma/client';
import { ProjectGroupDeleteOperationDto } from '../dtos/project-group-delete-operation.dto';

export function toProjectGroupDeleteOperationDto(
  projectGroupDeleteOperation: ProjectGroupDeleteOperation,
): ProjectGroupDeleteOperationDto {
  return {
    id: projectGroupDeleteOperation.id,
    recordId: projectGroupDeleteOperation.recordId,
    createdAt: projectGroupDeleteOperation.createdAt.toISOString(),
    updatedAt: projectGroupDeleteOperation.updatedAt.toISOString(),
    projectGroupOperationId:
      projectGroupDeleteOperation.projectGroupOperationId,
  };
}
