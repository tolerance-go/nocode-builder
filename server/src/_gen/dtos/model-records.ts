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

  @ApiProperty({})
  @IsInt()
  projectDetailId: number;
}

export class ProjectDetailModelRecordDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  viewProjectId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  dataTableProjectId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  bluemapProjectId?: number;

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

export class ViewProjectModelRecordDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({ enum: WidgetPlatformType })
  @IsEnum(WidgetPlatformType)
  platformType: WidgetPlatformType;

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

export class DataTableProjectModelRecordDto {
  @ApiProperty({})
  @IsInt()
  id: number;

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

export class BluemapProjectModelRecordDto {
  @ApiProperty({})
  @IsInt()
  id: number;

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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  viewProjectId?: number;

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

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;
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

  @ApiProperty({})
  @IsInt()
  widgetLibId: number;

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
