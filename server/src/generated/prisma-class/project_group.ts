import { User } from './user';
import { Project } from './project';
import { ProjectGroupOperation } from './project_group_operation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectGroup {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: Number })
  parentGroupId?: number;

  @ApiPropertyOptional({ type: () => ProjectGroup })
  parentGroup?: ProjectGroup;

  @ApiProperty({ isArray: true, type: () => ProjectGroup })
  childGroups: ProjectGroup[];

  @ApiProperty({ type: Number })
  ownerId: number;

  @ApiProperty({ type: () => User })
  owner: User;

  @ApiProperty({ isArray: true, type: () => Project })
  projects: Project[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ isArray: true, type: () => ProjectGroupOperation })
  operations: ProjectGroupOperation[];
}
