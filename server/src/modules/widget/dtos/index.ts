import { ApiProperty } from '@nestjs/swagger';
import { WidgetElementType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class WidgetCreateDto {
  @ApiProperty({
    enum: WidgetElementType,
  })
  @IsEnum(WidgetElementType)
  elementType: WidgetElementType;
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
