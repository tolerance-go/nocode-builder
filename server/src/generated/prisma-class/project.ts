import { User } from './user';
import { ProjectGroup } from './project_group';
import { ProjectOperation } from './project_operation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Project {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  ownerId: number;

  @ApiProperty({ type: () => User })
  owner: User;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: () => ProjectGroup })
  projectGroup?: ProjectGroup;

  @ApiPropertyOptional({ type: Number })
  projectGroupId?: number;

  @ApiProperty({ isArray: true, type: () => ProjectOperation })
  operations: ProjectOperation[];
}
