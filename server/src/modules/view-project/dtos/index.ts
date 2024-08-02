import { ApiProperty } from '@nestjs/swagger';
import { WidgetPlatformType } from '@prisma/client';
import {
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  IsIn,
  Min,
  IsEnum,
} from 'class-validator';

export class ViewProjectCreateDto {
  @ApiProperty({
    enum: WidgetPlatformType,
  })
  @IsEnum(WidgetPlatformType)
  platformType: WidgetPlatformType;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}

export class ViewProjectQueryDto {
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

export class ViewProjectUpdateDto {}

export class ViewProjectUpdateWithIdDto extends ViewProjectUpdateDto {
  @ApiProperty({})
  @IsInt()
  id: number;
}

export class ViewProjectResponseDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({
    enum: WidgetPlatformType,
  })
  @IsEnum(WidgetPlatformType)
  platformType: WidgetPlatformType;

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;
}
