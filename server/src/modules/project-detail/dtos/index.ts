import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ProjectDetailCreateDto {
  @ApiProperty({})
  @IsInt()
  viewProjectId?: number;

  @ApiProperty({})
  @IsInt()
  dataTableProjectId?: number;

  @ApiProperty({})
  @IsInt()
  bluemapProjectId?: number;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}

export class ProjectDetailQueryDto {
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

export class ProjectDetailUpdateDto {}

export class ProjectDetailUpdateWithIdDto extends ProjectDetailUpdateDto {
  @ApiProperty({})
  @IsInt()
  id: number;
}

export class ProjectDetailResponseDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsInt()
  ownerId: number;

  @ApiProperty({})
  @IsInt()
  viewProjectId?: number;

  @ApiProperty({})
  @IsInt()
  dataTableProjectId?: number;

  @ApiProperty({})
  @IsInt()
  bluemapProjectId?: number;

  @ApiProperty({})
  @IsDateString()
  createdAt: string;

  @ApiProperty({})
  @IsDateString()
  updatedAt: string;
}
