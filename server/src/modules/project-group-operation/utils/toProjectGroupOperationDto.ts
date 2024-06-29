import { ProjectGroupOperation } from '@prisma/client';
import { ProjectGroupOperationDto } from '../dtos/project-group-operation.dto';

export function toProjectGroupOperationDto(
  projectGroupOperation: ProjectGroupOperation,
): ProjectGroupOperationDto {
  return {
    id: projectGroupOperation.id,
    projectGroupId: projectGroupOperation.projectGroupId,
    projectGroupCreateOperationId:
      projectGroupOperation.projectGroupCreateOperationId ?? undefined,
    projectGroupUpdateOperationId:
      projectGroupOperation.projectGroupUpdateOperationId ?? undefined,
    projectGroupDeleteOperationId:
      projectGroupOperation.projectGroupDeleteOperationId ?? undefined,
  };
}
