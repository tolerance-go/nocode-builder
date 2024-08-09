import { ApiProperty } from '@nestjs/swagger';
import {
  WidgetCategory,
  WidgetDisplay,
  WidgetPlatformType,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { WidgetLibResponseDto } from 'src/modules/widget-lib/dtos';
import { WidgetSlotAssignmentWithSlotsResponseDto } from 'src/modules/widget-slot-assignment/dtos';
import { WidgetSlotCreateDto } from 'src/modules/widget-slot/dtos';

export class WidgetAddSlotDto {
  @ApiProperty({})
  @IsInt()
  widgetId: number;

  @ApiProperty({
    type: WidgetSlotCreateDto,
  })
  @ValidateNested()
  @Type(() => WidgetSlotCreateDto)
  slot: WidgetSlotCreateDto;
}

export class WidgetCreateDto {
  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({
    enum: WidgetDisplay,
  })
  @IsEnum(WidgetDisplay)
  display: WidgetDisplay;

  @ApiProperty({})
  @IsInt()
  order: number;

  @ApiProperty({})
  @IsInt()
  widgetLibId: number;

  @ApiProperty({
    enum: WidgetPlatformType,
    isArray: true,
  })
  @IsArray()
  @IsEnum(WidgetPlatformType, { each: true })
  platforms: WidgetPlatformType[];

  @ApiProperty({
    enum: WidgetCategory,
  })
  @IsEnum(WidgetCategory)
  category: WidgetCategory;
}

export class WidgetCreateManyDto {
  @ApiProperty({
    type: [WidgetCreateDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WidgetCreateDto)
  createDtos: WidgetCreateDto[];
}

export class WidgetQueryDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  take?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'updatedAt'])
  orderBy?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  filter?: string;
}

export class WidgetQueryByPlatformDto extends WidgetQueryDto {
  @ApiProperty({
    enum: WidgetPlatformType,
  })
  @IsEnum(WidgetPlatformType)
  platformType: WidgetPlatformType;
}

export class WidgetUpdateDto {}

export class WidgetUpdateWithIdDto extends WidgetUpdateDto {
  @ApiProperty({})
  @IsInt()
  id: number;
}

export class WidgetResponseDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({
    enum: WidgetDisplay,
  })
  @IsEnum(WidgetDisplay)
  display: WidgetDisplay;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({
    enum: WidgetPlatformType,
    isArray: true,
  })
  @IsArray()
  @IsEnum(WidgetPlatformType, { each: true })
  platforms: WidgetPlatformType[];

  @ApiProperty({
    enum: WidgetCategory,
  })
  @IsEnum(WidgetCategory)
  category: WidgetCategory;

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

export class WidgetWithLibResponseDto extends WidgetResponseDto {
  @ApiProperty({
    type: () => WidgetLibResponseDto,
  })
  @ValidateNested()
  @Type(() => WidgetLibResponseDto)
  widgetLib: WidgetLibResponseDto;
}

export class WidgetWithSlotsResponseDto extends WidgetResponseDto {
  @ApiProperty({
    type: () => [WidgetSlotAssignmentWithSlotsResponseDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WidgetSlotAssignmentWithSlotsResponseDto)
  widgetSlotAssignments: WidgetSlotAssignmentWithSlotsResponseDto[];
}
