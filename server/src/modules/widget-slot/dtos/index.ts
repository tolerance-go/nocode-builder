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

export class WidgetSlotCreateDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class WidgetSlotCreateManyDto {
  @ApiProperty({
    type: [WidgetSlotCreateDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WidgetSlotCreateDto)
  createDtos: WidgetSlotCreateDto[];
}

export class WidgetSlotQueryDto {
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

export class WidgetSlotUpdateDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class WidgetSlotUpdateWithIdDto extends WidgetSlotUpdateDto {
  @ApiProperty({})
  @IsInt()
  id: number;
}

export class WidgetSlotResponseDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
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
