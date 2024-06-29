import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class ProjectDeleteOperationCreateDto {
  @ApiProperty({ required: true })
  @IsInt()
  recordId: number;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDateString()
  updatedAt?: string;

  @ApiProperty({ required: true })
  @IsInt()
  projectOperationId: number;
}
