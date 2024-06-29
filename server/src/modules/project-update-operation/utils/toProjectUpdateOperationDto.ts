import { ProjectUpdateOperation } from '@prisma/client';
import { ProjectUpdateOperationDto } from '../dtos/project-update-operation.dto';

export function toProjectUpdateOperationDto(
  projectUpdateOperation: ProjectUpdateOperation,
): ProjectUpdateOperationDto {
  return {
    id: projectUpdateOperation.id,
    recordId: projectUpdateOperation.recordId,
    createdAt: projectUpdateOperation.createdAt.toISOString(),
    updatedAt: projectUpdateOperation.updatedAt.toISOString(),
    projectOperationId: projectUpdateOperation.projectOperationId,
  };
}
