/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
} from 'class-validator';

export enum ProjectTypeEnum {
  View = 'View',
  DataTable = 'DataTable',
  Bluemap = 'Bluemap',
}

export class ProjectDto {
  @ApiProperty() @IsInt() id: number;
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsInt() ownerId: number;
  @ApiProperty() @ApiProperty({ type: UserDto }) owner: UserDto;
  @ApiProperty() @IsDateString() createdAt: Date;
  @ApiProperty() @IsDateString() updatedAt: Date;
  @ApiProperty({ required: false })
  @ApiProperty({ type: ProjectGroupDto })
  @IsOptional()
  projectGroup?: ProjectGroupDto;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  projectGroupId?: number;
  @ApiProperty()
  @ApiProperty({ enum: ProjectTypeEnum })
  @IsEnum(ProjectTypeEnum)
  type: ProjectTypeEnum;
}

export class ProjectGroupDto {
  @ApiProperty() @IsInt() id: number;
  @ApiProperty() @IsString() name: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  parentGroupId?: number;
  @ApiProperty({ required: false })
  @ApiProperty({ type: ProjectGroupDto })
  @IsOptional()
  parentGroup?: ProjectGroupDto;
  @ApiProperty()
  @ApiProperty({ type: ProjectGroupDto })
  childGroups: ProjectGroupDto[];
  @ApiProperty() @IsInt() ownerId: number;
  @ApiProperty() @ApiProperty({ type: UserDto }) owner: UserDto;
  @ApiProperty() @ApiProperty({ type: ProjectDto }) projects: ProjectDto[];
  @ApiProperty() @IsDateString() createdAt: Date;
  @ApiProperty() @IsDateString() updatedAt: Date;
}

export class UserDto {
  @ApiProperty() @IsInt() id: number;
  @ApiProperty() @IsString() name: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() email?: string;
  @ApiProperty() @IsString() password: string;
  @ApiProperty() @ApiProperty({ type: ProjectDto }) projects: ProjectDto[];
  @ApiProperty() @IsDateString() createdAt: Date;
  @ApiProperty() @IsDateString() updatedAt: Date;
  @ApiProperty()
  @ApiProperty({ type: ProjectGroupDto })
  projectGroups: ProjectGroupDto[];
}
