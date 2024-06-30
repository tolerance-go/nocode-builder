import { ProjectOperation } from './project_operation';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectUpdateOperation {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  recordId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: () => ProjectOperation })
  projectOperation: ProjectOperation;

  @ApiProperty({ type: Number })
  projectOperationId: number;
}
