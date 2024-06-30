import { TimeChunk } from './time_chunk';
import { ProjectOperation } from './project_operation';
import { ProjectGroupOperation } from './project_group_operation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TimeNode {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  timeChunkId: number;

  @ApiProperty({ type: () => TimeChunk })
  timeChunk: TimeChunk;

  @ApiPropertyOptional({ type: Number })
  projectOperationId?: number;

  @ApiPropertyOptional({ type: () => ProjectOperation })
  projectOperation?: ProjectOperation;

  @ApiPropertyOptional({ type: Number })
  projectGroupOperationId?: number;

  @ApiPropertyOptional({ type: () => ProjectGroupOperation })
  ProjectGroupOperation?: ProjectGroupOperation;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
