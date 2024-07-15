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
    description: 'Number of records to skip for pagination',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @ApiProperty({
    description: 'Number of records to take for pagination',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  take?: number;

  @ApiProperty({
    description: 'Field by which to order the results',
    example: 'createdAt',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['name', 'createdAt', 'updatedAt'])
  orderBy?: string;

  @ApiProperty({
    description: 'Filter condition',
    example: 'Project Group 1',
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

export class ProjectGroupDto {
  @ApiProperty({})
  @IsInt()
  id: number;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    nullable: true,
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
