import { ProjectGroupUpdateOperation } from '@prisma/client';
import { ProjectGroupUpdateOperationDto } from '../dtos/project-group-update-operation.dto';

export function toProjectGroupUpdateOperationDto(
  projectGroupUpdateOperation: ProjectGroupUpdateOperation,
): ProjectGroupUpdateOperationDto {
  return {
    id: projectGroupUpdateOperation.id,
    recordId: projectGroupUpdateOperation.recordId,
    createdAt: projectGroupUpdateOperation.createdAt.toISOString(),
    updatedAt: projectGroupUpdateOperation.updatedAt.toISOString(),
    projectGroupOperationId:
      projectGroupUpdateOperation.projectGroupOperationId,
  };
}
