import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class ProjectUpdateOperationDto {
  @ApiProperty({
    description: 'The unique identifier of the project group',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'The name of the project group',
    example: 'Project Group 1',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The parent group ID of the project group',
    required: false,
    nullable: true,
    example: 1,
  })
  @IsInt()
  @IsOptional()
  parentGroupId?: number;

  @ApiProperty({
    description: 'The owner ID of the project group',
    example: 1,
  })
  @IsInt()
  ownerId: number;

  @ApiProperty({
    description: 'The date and time when the project group was created',
    example: '2024-01-01T00:00:00Z',
  })
  @IsDateString()
  createdAt: string;

  @ApiProperty({
    description: 'The date and time when the project group was last updated',
    example: '2024-01-02T00:00:00Z',
  })
  @IsDateString()
  updatedAt: string;
}
