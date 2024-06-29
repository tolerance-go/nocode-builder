import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class TimeNodeCreateDto {
  @ApiProperty({ required: true })
  @IsInt()
  timeChunkId: number;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsInt()
  projectOperationId?: number;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsInt()
  projectGroupOperationId?: number;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
