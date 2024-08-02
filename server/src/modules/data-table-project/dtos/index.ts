import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class DataTableProjectCreateDto {
  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}

export class DataTableProjectQueryDto {
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

export class DataTableProjectUpdateDto {}

export class DataTableProjectUpdateWithIdDto extends DataTableProjectUpdateDto {
  @ApiProperty({})
  @IsInt()
  id: number;
}

export class DataTableProjectResponseDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;
}
