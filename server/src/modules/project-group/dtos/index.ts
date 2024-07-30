import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ProjectGroupCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  parentGroupId?: number;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}

export class ProjectGroupQueryDto {
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
  @IsIn(['name', 'createdAt', 'updatedAt'])
  orderBy?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  filter?: string;
}

export class ProjectGroupUpdateDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsInt()
  parentGroupId?: number;
}

export class ProjectGroupUpdateWithIdDto extends ProjectGroupUpdateDto {
  @ApiProperty({})
  @IsInt()
  id: number;
}

export class ProjectGroupResponseDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsInt()
  @IsOptional()
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
