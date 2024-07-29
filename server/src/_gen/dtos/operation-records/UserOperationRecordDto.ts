/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

import { ApiProperty } from '@nestjs/swagger';
import { ProjectOperationRecordDto } from './ProjectOperationRecordDto';
import { ProjectGroupOperationRecordDto } from './ProjectGroupOperationRecordDto';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsOptional,
  ValidateNested,
  IsDateString,
} from 'class-validator';

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
  @ValidateNested({ each: true })
  @Type(() => ProjectGroupOperationRecordDto)
  projectGroups: ProjectGroupOperationRecordDto[];
}
