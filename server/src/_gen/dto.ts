/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { forwardRef } from '@nestjs/common';
import { ProjectType } from '@prisma/client';

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
  projects: ProjectDto[];

  @ApiProperty({})
  @IsDateString()
  createdAt: Date;

  @ApiProperty({})
  @IsDateString()
  updatedAt: Date;

  @ApiProperty({ type: () => forwardRef(() => ProjectGroupDto) })
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
  projectGroup?: ProjectGroupDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  projectGroupId?: number;

  @ApiProperty({ enum: ProjectType })
  @IsEnum(ProjectType)
  type: ProjectType;
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
  parentGroup?: ProjectGroupDto;

  @ApiProperty({ type: () => forwardRef(() => ProjectGroupDto) })
  childGroups: ProjectGroupDto[];

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({ type: () => forwardRef(() => UserDto) })
  owner: UserDto;

  @ApiProperty({ type: () => forwardRef(() => ProjectDto) })
  projects: ProjectDto[];

  @ApiProperty({})
  @IsDateString()
  createdAt: Date;

  @ApiProperty({})
  @IsDateString()
  updatedAt: Date;
}
