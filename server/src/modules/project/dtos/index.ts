import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsIn,
  Min,
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
  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}

export class ProjectQueryDto {
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
    example: 'Project 1',
    required: false,
  })
  @IsOptional()
  @IsString()
  filter?: string;
}

export class ProjectUpdateDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'Project 1',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The project group ID of the project',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  projectGroupId?: number;
}

export class ProjectDto {
  @ApiProperty({
    description: 'The unique identifier of the project',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'The name of the project',
    example: 'Project 1',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The project group ID of the project',
    required: false,
    nullable: true,
    example: 1,
  })
  @IsInt()
  @IsOptional()
  projectGroupId: number | null;

  @ApiProperty({
    description: 'The owner ID of the project',
    example: 1,
  })
  @IsInt()
  ownerId: number;

  @ApiProperty({
    description: 'The date and time when the project was created',
    example: '2024-01-01T00:00:00Z',
  })
  @IsDateString()
  createdAt: string;

  @ApiProperty({
    description: 'The date and time when the project was last updated',
    example: '2024-01-02T00:00:00Z',
  })
  @IsDateString()
  updatedAt: string;
}
