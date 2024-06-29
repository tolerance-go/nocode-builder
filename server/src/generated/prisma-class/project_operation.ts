import { Project } from './project';
import { TimeNode } from './time_node';
import { ProjectUpdateOperation } from './project_update_operation';
import { ProjectDeleteOperation } from './project_delete_operation';
import { ProjectCreateOperation } from './project_create_operation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectOperation {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  projectId: number;

  @ApiProperty({ type: () => Project })
  project: Project;

  @ApiPropertyOptional({ type: Number })
  projectCreateOperationId?: number;

  @ApiPropertyOptional({ type: Number })
  projectUpdateOperationId?: number;

  @ApiPropertyOptional({ type: Number })
  projectDeleteOperationId?: number;

  @ApiPropertyOptional({ type: () => TimeNode })
  timeNode?: TimeNode;

  @ApiPropertyOptional({ type: () => ProjectUpdateOperation })
  projectUpdateOperation?: ProjectUpdateOperation;

  @ApiPropertyOptional({ type: () => ProjectDeleteOperation })
  projectDeleteOperation?: ProjectDeleteOperation;

  @ApiPropertyOptional({ type: () => ProjectCreateOperation })
  projectCreateOperation?: ProjectCreateOperation;
}
