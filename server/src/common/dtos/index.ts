import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { ProjectGroupResponseDto } from 'src/modules/project-group/dtos';
import { ProjectResponseDto } from 'src/modules/project/dtos';

export class CountDto {
  @ApiProperty()
  count: number;
}

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
