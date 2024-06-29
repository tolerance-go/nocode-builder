import { Project } from './project';
import { ProjectGroup } from './project_group';
import { TimeChunk } from './time_chunk';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: String })
  email?: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ isArray: true, type: () => Project })
  projects: Project[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ isArray: true, type: () => ProjectGroup })
  projectGroups: ProjectGroup[];

  @ApiProperty({ isArray: true, type: () => TimeChunk })
  timeChunk: TimeChunk[];
}
