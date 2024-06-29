import { ProjectGroupOperation } from './project_group_operation';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectGroupDeleteOperation {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  recordId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: () => ProjectGroupOperation })
  projectGroupOperation: ProjectGroupOperation;

  @ApiProperty({ type: Number })
  projectGroupOperationId: number;
}
