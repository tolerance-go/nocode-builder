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
  ValidateNested,
} from 'class-validator';
import { ProjectType } from '@prisma/client';
import { Type } from 'class-transformer';

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

  @ApiProperty({ type: () => ProjectOperationRecordDto })
  @ValidateNested({ each: true })
  @Type(() => ProjectOperationRecordDto)
  projects: ProjectOperationRecordDto[];

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;

  @ApiProperty({ type: () => ProjectGroupOperationRecordDto })
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

  @ApiProperty({ type: () => UserOperationRecordDto })
  owner: UserOperationRecordDto;

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;

  @ApiProperty({
    required: false,
    type: () => ProjectGroupOperationRecordDto,
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
    type: () => ProjectGroupOperationRecordDto,
  })
  @IsOptional()
  parentGroup?: ProjectGroupOperationRecordDto;

  @ApiProperty({ type: () => ProjectGroupOperationRecordDto })
  childGroups: ProjectGroupOperationRecordDto[];

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({ type: () => UserOperationRecordDto })
  owner: UserOperationRecordDto;

  @ApiProperty({ type: () => ProjectOperationRecordDto })
  projects: ProjectOperationRecordDto[];

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;
}
