import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsDateString } from 'class-validator';

export class ProjectGroupUpdateDto {
  @ApiProperty({
    description: 'The name of the project group',
    example: 'Project Group 1',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The parent group ID of the project group',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  parentGroupId?: number;

  @ApiProperty({
    description: 'The last update date of the project group record',
    example: '2024-01-02T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
