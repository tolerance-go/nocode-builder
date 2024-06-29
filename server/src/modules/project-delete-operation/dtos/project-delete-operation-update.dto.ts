import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ProjectDeleteOperationUpdateDto {
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
}
