import { ApiProperty } from '@nestjs/swagger';
import { ProjectResponseDto } from 'src/modules/project/dtos';
import { ProjectGroupResponseDto } from 'src/modules/project-group/dtos';
import { IsDateString } from 'class-validator';

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    required: false,
  })
  email?: string;

  @ApiProperty()
  @IsDateString()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  updatedAt: string;

  @ApiProperty({
    type: [ProjectResponseDto],
  })
  projects: ProjectResponseDto[];

  @ApiProperty({
    type: [ProjectGroupResponseDto],
  })
  projectGroups: ProjectGroupResponseDto[];
}
