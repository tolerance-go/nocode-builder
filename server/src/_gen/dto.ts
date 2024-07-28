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

export class UserDto {
  @ApiProperty() @IsInt() id: number;
  @ApiProperty() @IsString() name: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() email?: string;
  @ApiProperty() @IsString() password: string;
  @ApiProperty() projects: ProjectDto[];
  @ApiProperty() @IsDateString() createdAt: Date;
  @ApiProperty() @IsDateString() updatedAt: Date;
  @ApiProperty() projectGroups: ProjectGroupDto[];
}

export class ProjectDto {
  @ApiProperty() @IsInt() id: number;
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsInt() ownerId: number;
  @ApiProperty() owner: UserDto;
  @ApiProperty() @IsDateString() createdAt: Date;
  @ApiProperty() @IsDateString() updatedAt: Date;
  @ApiProperty({ required: false }) projectGroup?: ProjectGroupDto;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  projectGroupId?: number;
  @ApiProperty() type: ProjectTypeEnum;
}

export class ProjectGroupDto {
  @ApiProperty() @IsInt() id: number;
  @ApiProperty() @IsString() name: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  parentGroupId?: number;
  @ApiProperty({ required: false }) parentGroup?: ProjectGroupDto;
  @ApiProperty() childGroups: ProjectGroupDto[];
  @ApiProperty() @IsInt() ownerId: number;
  @ApiProperty({
    type: UserDto,
  })
  owner: UserDto;
  @ApiProperty() projects: ProjectDto[];
  @ApiProperty() @IsDateString() createdAt: Date;
  @ApiProperty() @IsDateString() updatedAt: Date;
}
