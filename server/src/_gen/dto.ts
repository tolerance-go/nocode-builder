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

export class UserDto {
  @ApiProperty() @IsInt() id: number;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() email?: string;
  @ApiProperty() @IsString() @IsNotEmpty() password: string;
  @ApiProperty() @IsString() @IsNotEmpty() projects: ProjectModel[];
  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  createdAt: Date;
  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt: Date;
  @ApiProperty() @IsString() @IsNotEmpty() projectGroups: ProjectGroupModel[];
}

export class ProjectDto {
  @ApiProperty() @IsInt() id: number;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() ownerId: number;
  @ApiProperty() @IsString() @IsNotEmpty() owner: UserModel;
  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  createdAt: Date;
  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt: Date;
  @ApiProperty() @IsString() @IsNotEmpty() projectGroup?: ProjectGroupModel;
  @ApiProperty() @IsString() @IsNotEmpty() projectGroupId?: number;
  @ApiProperty({ enum: ProjectTypeEnum })
  @IsEnum(ProjectTypeEnum)
  @IsNotEmpty()
  type: ProjectTypeEnum;
}

export class ProjectGroupDto {
  @ApiProperty() @IsInt() id: number;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() parentGroupId?: number;
  @ApiProperty() @IsString() @IsNotEmpty() parentGroup?: ProjectGroupModel;
  @ApiProperty() @IsString() @IsNotEmpty() childGroups: ProjectGroupModel[];
  @ApiProperty() @IsString() @IsNotEmpty() ownerId: number;
  @ApiProperty() @IsString() @IsNotEmpty() owner: UserModel;
  @ApiProperty() @IsString() @IsNotEmpty() projects: ProjectModel[];
  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  createdAt: Date;
  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt: Date;
}
