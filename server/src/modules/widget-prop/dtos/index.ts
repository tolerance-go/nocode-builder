import { ApiProperty } from '@nestjs/swagger';
import { WidgetPropValueType } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class WidgetPropCreateDto {
  @ApiProperty({})
  @IsString()
  key: string;

  @ApiProperty({
    required: false,
  })
  @IsJSON()
  jsonValue?: JsonValue;

  @ApiProperty({
    required: false,
  })
  @IsString()
  stringValue?: string;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  numberValue?: number;

  @ApiProperty({
    required: false,
  })
  @IsBoolean()
  boolValue?: boolean;

  @ApiProperty({
    enum: WidgetPropValueType,
  })
  @IsEnum(WidgetPropValueType)
  valueType: WidgetPropValueType;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}

export class WidgetPropQueryDto {
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

export class WidgetPropUpdateDto {}

export class WidgetPropUpdateWithIdDto extends WidgetPropUpdateDto {
  @ApiProperty({})
  @IsInt()
  id: number;
}

export class WidgetPropResponseDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  key: string;

  @ApiProperty({
    required: false,
  })
  @IsJSON()
  jsonValue?: JsonValue;

  @ApiProperty({
    required: false,
  })
  @IsString()
  stringValue?: string;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  numberValue?: number;

  @ApiProperty({
    required: false,
  })
  @IsBoolean()
  boolValue?: boolean;

  @ApiProperty({
    enum: WidgetPropValueType,
  })
  @IsEnum(WidgetPropValueType)
  valueType: WidgetPropValueType;

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({
    required: false,
  })
  @IsInt()
  widgetInstanceId?: number;

  @ApiProperty({
    required: false,
  })
  @IsInt()
  widgetId?: number;

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;
}
