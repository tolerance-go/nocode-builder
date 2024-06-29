import { ProjectGroupCreateOperation } from '@prisma/client';
import { ProjectGroupCreateOperationDto } from '../dtos/project-group-create-operation.dto';

export function toProjectGroupCreateOperationDto(
  projectGroupCreateOperation: ProjectGroupCreateOperation,
): ProjectGroupCreateOperationDto {
  return {
    id: projectGroupCreateOperation.id,
    recordId: projectGroupCreateOperation.recordId,
    createdAt: projectGroupCreateOperation.createdAt.toISOString(),
    updatedAt: projectGroupCreateOperation.updatedAt.toISOString(),
    projectGroupOperationId:
      projectGroupCreateOperation.projectGroupOperationId,
  };
}
