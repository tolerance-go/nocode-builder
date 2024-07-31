import { ApiProperty } from '@nestjs/swagger';
import { WidgetElementType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  WidgetSlotAssignmentResponseDto,
  WidgetSlotAssignmentWithSlotsResponseDto,
} from 'src/modules/widget-slot-assignment/dtos';
import {
  WidgetSlotCreateDto,
  WidgetSlotResponseDto,
} from 'src/modules/widget-slot/dtos';

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
  @ApiProperty({
    enum: WidgetElementType,
  })
  @IsEnum(WidgetElementType)
  elementType: WidgetElementType;
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

export class WidgetIncludeDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  slots?: boolean;
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
    enum: WidgetElementType,
  })
  @IsEnum(WidgetElementType)
  elementType: WidgetElementType;

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

export class WidgetWithSlotsResponseDto extends WidgetResponseDto {
  @ApiProperty({
    type: () => [WidgetSlotAssignmentWithSlotsResponseDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WidgetSlotAssignmentWithSlotsResponseDto)
  slots: WidgetSlotAssignmentWithSlotsResponseDto[];
}
