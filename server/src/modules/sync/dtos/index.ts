import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  ProjectGroupCreateDto,
  ProjectGroupUpdateWithIdDto,
} from 'src/modules/project-group/dtos';
import {
  ProjectCreateDto,
  ProjectUpdateWithIdDto,
} from 'src/modules/project/dtos';

export class ProjectGroupCreateWithChildrenDto extends ProjectGroupCreateDto {
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [
        { $ref: getSchemaPath(ProjectCreateDto) },
        { $ref: getSchemaPath(ProjectGroupCreateWithChildrenDto) },
      ],
    },
    required: false,
  })
  @IsOptional()
  children?: (ProjectCreateDto | ProjectGroupCreateWithChildrenDto)[];
}

export class ProjectDiffDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'array',
      items: {
        oneOf: [
          { $ref: getSchemaPath(ProjectCreateDto) },
          { $ref: getSchemaPath(ProjectGroupCreateWithChildrenDto) },
        ],
      },
    },
  })
  @IsOptional()
  additions?: (ProjectGroupCreateWithChildrenDto | ProjectCreateDto)[][];

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
