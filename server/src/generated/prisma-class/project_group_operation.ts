import { ProjectGroup } from './project_group';
import { TimeNode } from './time_node';
import { ProjectGroupCreateOperation } from './project_group_create_operation';
import { ProjectGroupUpdateOperation } from './project_group_update_operation';
import { ProjectGroupDeleteOperation } from './project_group_delete_operation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectGroupOperation {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  projectGroupId: number;

  @ApiProperty({ type: () => ProjectGroup })
  projectGroup: ProjectGroup;

  @ApiPropertyOptional({ type: Number })
  projectGroupCreateOperationId?: number;

  @ApiPropertyOptional({ type: Number })
  projectGroupUpdateOperationId?: number;

  @ApiPropertyOptional({ type: Number })
  projectGroupDeleteOperationId?: number;

  @ApiPropertyOptional({ type: () => TimeNode })
  timeNode?: TimeNode;

  @ApiPropertyOptional({ type: () => ProjectGroupCreateOperation })
  projectGroupCreateOperation?: ProjectGroupCreateOperation;

  @ApiPropertyOptional({ type: () => ProjectGroupUpdateOperation })
  projectGroupUpdateOperation?: ProjectGroupUpdateOperation;

  @ApiPropertyOptional({ type: () => ProjectGroupDeleteOperation })
  projectGroupDeleteOperation?: ProjectGroupDeleteOperation;
}
