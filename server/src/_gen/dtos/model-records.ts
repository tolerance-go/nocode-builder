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
import {
  ProjectType,
  WidgetPlatformType,
  WidgetCategory,
} from '@prisma/client';

export class UserModelRecordDto {
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

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;

  @ApiProperty({})
  isAdmin: boolean;
}

export class ProjectModelRecordDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  projectGroupId?: number;

  @ApiProperty({ enum: ProjectType })
  @IsEnum(ProjectType)
  type: ProjectType;
}

export class ProjectGroupModelRecordDto {
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

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;
}

export class WidgetLibModelRecordDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;
}

export class WidgetInstanceModelRecordDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsInt()
  widgetId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  parentSlotId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({})
  @IsInt()
  ownerId: number;
}

export class WidgetSlotInstanceModelRecordDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsInt()
  widgetSlotId: number;

  @ApiProperty({})
  @IsInt()
  ownerId: number;
}

export class WidgetSlotInstanceAssignmentModelRecordDto {
  @ApiProperty({})
  @IsInt()
  widgetInstanceId: number;

  @ApiProperty({})
  @IsInt()
  slotInstanceId: number;

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({})
  @IsDateString()
  assignedAt: string;
}

export class WidgetModelRecordDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({ enum: WidgetPlatformType })
  @IsEnum(WidgetPlatformType)
  platforms: WidgetPlatformType[];

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  widgetLibId?: number;

  @ApiProperty({ enum: WidgetCategory })
  @IsEnum(WidgetCategory)
  category: WidgetCategory;

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;
}

export class WidgetSlotModelRecordDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;
}

export class WidgetSlotAssignmentModelRecordDto {
  @ApiProperty({})
  @IsInt()
  widgetId: number;

  @ApiProperty({})
  @IsInt()
  slotId: number;

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({})
  @IsDateString()
  assignedAt: string;
}
