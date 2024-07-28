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

export class UserOperationRecordDto {
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

  @ApiProperty({ type: () => forwardRef(() => ProjectOperationRecordDto) })
  projects: ProjectOperationRecordDto[];

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;

  @ApiProperty({ type: () => forwardRef(() => ProjectGroupOperationRecordDto) })
  projectGroups: ProjectGroupOperationRecordDto[];
}

export class ProjectOperationRecordDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({ type: () => forwardRef(() => UserOperationRecordDto) })
  owner: UserOperationRecordDto;

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;

  @ApiProperty({
    required: false,
    type: () => forwardRef(() => ProjectGroupOperationRecordDto),
  })
  @IsOptional()
  projectGroup?: ProjectGroupOperationRecordDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  projectGroupId?: number;

  @ApiProperty({ enum: ProjectType })
  @IsEnum(ProjectType)
  type: ProjectType;
}

export class ProjectGroupOperationRecordDto {
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
    type: () => forwardRef(() => ProjectGroupOperationRecordDto),
  })
  @IsOptional()
  parentGroup?: ProjectGroupOperationRecordDto;

  @ApiProperty({ type: () => forwardRef(() => ProjectGroupOperationRecordDto) })
  childGroups: ProjectGroupOperationRecordDto[];

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({ type: () => forwardRef(() => UserOperationRecordDto) })
  owner: UserOperationRecordDto;

  @ApiProperty({ type: () => forwardRef(() => ProjectOperationRecordDto) })
  projects: ProjectOperationRecordDto[];

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;
}
