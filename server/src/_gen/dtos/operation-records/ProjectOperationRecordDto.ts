/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

import { ApiProperty } from '@nestjs/swagger';
import { UserOperationRecordDto } from './UserOperationRecordDto';
import { ProjectGroupOperationRecordDto } from './ProjectGroupOperationRecordDto';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  ValidateNested,
  IsDateString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ProjectType } from '@prisma/client';

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
  @ValidateNested()
  @Type(() => UserOperationRecordDto)
  owner: UserOperationRecordDto;

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;

  @ApiProperty({ required: false, type: () => ProjectGroupOperationRecordDto })
  @ValidateNested()
  @Type(() => ProjectGroupOperationRecordDto)
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
