import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class TimeChunkUpdateDto {
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
