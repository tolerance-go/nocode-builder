/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

import { ApiProperty } from '@nestjs/swagger';
import { UserOperationRecordDto } from './UserOperationRecordDto';
import { ProjectOperationRecordDto } from './ProjectOperationRecordDto';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsOptional,
  ValidateNested,
  IsDateString,
} from 'class-validator';

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

  @ApiProperty({ required: false, type: () => ProjectGroupOperationRecordDto })
  @ValidateNested()
  @Type(() => ProjectGroupOperationRecordDto)
  @IsOptional()
  parentGroup?: ProjectGroupOperationRecordDto;

  @ApiProperty({ type: () => ProjectGroupOperationRecordDto })
  @ValidateNested({ each: true })
  @Type(() => ProjectGroupOperationRecordDto)
  childGroups: ProjectGroupOperationRecordDto[];

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({ type: () => UserOperationRecordDto })
  @ValidateNested()
  @Type(() => UserOperationRecordDto)
  owner: UserOperationRecordDto;

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
}
