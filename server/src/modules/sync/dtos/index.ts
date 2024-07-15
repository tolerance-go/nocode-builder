import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  ProjectGroupCreateDto,
  ProjectGroupUpdateWithIdDto,
} from 'src/modules/project-group/dtos';
import {
  ProjectCreateDto,
  ProjectUpdateWithIdDto,
} from 'src/modules/project/dtos';

export class ProjectDiffDto {
  @ApiProperty({
    type: [ProjectCreateDto],
  })
  @IsOptional()
  projectsToCreate?: ProjectCreateDto[];

  @ApiProperty({
    type: [ProjectGroupCreateDto],
  })
  @IsOptional()
  projectGroupsToCreate?: ProjectGroupCreateDto[];

  @ApiProperty({
    type: [ProjectUpdateWithIdDto],
  })
  @IsOptional()
  projectsToUpdate?: ProjectUpdateWithIdDto[];

  @ApiProperty({
    type: [ProjectGroupUpdateWithIdDto],
  })
  @IsOptional()
  projectGroupsToUpdate?: ProjectGroupUpdateWithIdDto[];

  @ApiProperty({
    type: [Number],
  })
  @IsOptional()
  projectIdsToDelete?: number[];

  @ApiProperty({
    type: [Number],
  })
  @IsOptional()
  projectGroupIdsToDelete?: number[];
}
