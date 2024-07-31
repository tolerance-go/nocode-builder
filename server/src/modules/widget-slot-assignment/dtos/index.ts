import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { WidgetSlotResponseDto } from 'src/modules/widget-slot/dtos';

export class WidgetSlotAssignmentCreateDto {
  @ApiProperty({})
  @IsInt()
  @IsNotEmpty()
  widgetId: number;

  @ApiProperty({})
  @IsInt()
  @IsNotEmpty()
  slotId: number;
}

export class WidgetSlotAssignmentCreateManyDto {
  @ApiProperty({
    type: [WidgetSlotAssignmentCreateDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WidgetSlotAssignmentCreateDto)
  createDtos: WidgetSlotAssignmentCreateDto[];
}

export class WidgetSlotAssignmentQueryDto {
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
  @IsIn(['assignedAt'])
  orderBy?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  filterWidgetId?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  filterSlotId?: number;
}

export class WidgetSlotAssignmentUpdateDto {}

export class WidgetSlotAssignmentUpdateWithIdDto extends WidgetSlotAssignmentUpdateDto {
  @ApiProperty({})
  @IsInt()
  id: number;
}

export class WidgetSlotAssignmentResponseDto {
  @ApiProperty({})
  @IsInt()
  @IsNotEmpty()
  widgetId: number;

  @ApiProperty({})
  @IsInt()
  @IsNotEmpty()
  slotId: number;

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({})
  @IsDateString()
  assignedAt: string;
}

export class WidgetSlotAssignmentWithSlotsResponseDto extends WidgetSlotAssignmentResponseDto {
  @ApiProperty({
    type: WidgetSlotResponseDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WidgetSlotResponseDto)
  slot: WidgetSlotResponseDto;
}
