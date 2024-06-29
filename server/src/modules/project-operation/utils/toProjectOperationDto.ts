import { ProjectOperation } from '@prisma/client';
import { ProjectOperationDto } from '../dtos/project-operation.dto';

export function toProjectOperationDto(
  projectOperation: ProjectOperation,
): ProjectOperationDto {
  return {
    id: projectOperation.id,
    projectId: projectOperation.projectId,
    projectCreateOperationId:
      projectOperation.projectCreateOperationId ?? undefined,
    projectUpdateOperationId:
      projectOperation.projectUpdateOperationId ?? undefined,
    projectDeleteOperationId:
      projectOperation.projectDeleteOperationId ?? undefined,
  };
}
