import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { forwardRef } from '@nestjs/common';

export enum ProjectTypeEnum {
  View = 'View',
  DataTable = 'DataTable',
  Bluemap = 'Bluemap',
}

export class UserDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({})
  @IsString()
  password: string;

  @ApiProperty({ type: () => forwardRef(() => ProjectDto) })
  @Type(() => ProjectDto)
  projects: ProjectDto[];

  @ApiProperty({})
  @IsDateString()
  createdAt: Date;

  @ApiProperty({})
  @IsDateString()
  updatedAt: Date;

  @ApiProperty({ type: () => forwardRef(() => ProjectGroupDto) })
  @Type(() => ProjectGroupDto)
  projectGroups: ProjectGroupDto[];
}

export class ProjectDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({ type: () => forwardRef(() => UserDto) })
  @Type(() => UserDto)
  owner: UserDto;

  @ApiProperty({})
  @IsDateString()
  createdAt: Date;

  @ApiProperty({})
  @IsDateString()
  updatedAt: Date;

  @ApiProperty({
    required: false,
    type: () => forwardRef(() => ProjectGroupDto),
  })
  @IsOptional()
  @Type(() => ProjectGroupDto)
  projectGroup?: ProjectGroupDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  projectGroupId?: number;

  @ApiProperty({ enum: ProjectTypeEnum })
  @IsEnum(ProjectTypeEnum)
  type: ProjectTypeEnum;
}

export class ProjectGroupDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  parentGroupId?: number;

  @ApiProperty({
    required: false,
    type: () => forwardRef(() => ProjectGroupDto),
  })
  @IsOptional()
  @Type(() => ProjectGroupDto)
  parentGroup?: ProjectGroupDto;

  @ApiProperty({ type: () => forwardRef(() => ProjectGroupDto) })
  @Type(() => ProjectGroupDto)
  childGroups: ProjectGroupDto[];

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({ type: () => forwardRef(() => UserDto) })
  @Type(() => UserDto)
  owner: UserDto;

  @ApiProperty({ type: () => forwardRef(() => ProjectDto) })
  @Type(() => ProjectDto)
  projects: ProjectDto[];

  @ApiProperty({})
  @IsDateString()
  createdAt: Date;

  @ApiProperty({})
  @IsDateString()
  updatedAt: Date;
}
