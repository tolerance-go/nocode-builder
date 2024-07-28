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

export enum ProjectTypeEnum {
  View = 'View',
  DataTable = 'DataTable',
  Bluemap = 'Bluemap',
}

export class UserDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ type: ProjectDto })
  projects: ProjectDto[];

  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsDateString()
  updatedAt: Date;

  @ApiProperty({ type: ProjectGroupDto })
  projectGroups: ProjectGroupDto[];
}

export class ProjectDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  ownerId: number;

  @ApiProperty({ type: UserDto })
  owner: UserDto;

  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsDateString()
  updatedAt: Date;

  @ApiProperty({ required: false }, { type: ProjectGroupDto })
  @IsOptional()
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
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  parentGroupId?: number;

  @ApiProperty({ required: false }, { type: ProjectGroupDto })
  @IsOptional()
  parentGroup?: ProjectGroupDto;

  @ApiProperty({ type: ProjectGroupDto })
  childGroups: ProjectGroupDto[];

  @ApiProperty()
  @IsInt()
  ownerId: number;

  @ApiProperty({ type: UserDto })
  owner: UserDto;

  @ApiProperty({ type: ProjectDto })
  projects: ProjectDto[];

  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsDateString()
  updatedAt: Date;
}
