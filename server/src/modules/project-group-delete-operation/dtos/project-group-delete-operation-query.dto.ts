import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, Min, IsIn } from 'class-validator';

export class ProjectGroupDeleteOperationQueryDto {
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
