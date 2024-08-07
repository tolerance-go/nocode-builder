import { ApiProperty } from '@nestjs/swagger';
import { ProjectType } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsIn,
  Min,
  IsEnum,
} from 'class-validator';

export class ProjectCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  projectGroupId?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  projectDetailId?: number;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt?: string;

  @ApiProperty({
    enum: ProjectType,
  })
  @IsEnum(ProjectType)
  @IsNotEmpty()
  type: ProjectType;
}

export class ProjectQueryDto {
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

export class ProjectUpdateDto {
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
  projectGroupId?: number;
}

export class ProjectUpdateWithIdDto extends ProjectUpdateDto {
  @ApiProperty({})
  @IsInt()
  id: number;
}

export class ProjectResponseDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({
    enum: ProjectType,
  })
  type: ProjectType;

  @ApiProperty({
    required: false,
  })
  @IsInt()
  @IsOptional()
  projectGroupId?: number;

  @ApiProperty({})
  @IsInt()
  projectDetailId: number;

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
