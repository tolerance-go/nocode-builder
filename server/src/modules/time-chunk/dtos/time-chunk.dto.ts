import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class TimeChunkDto {
  @ApiProperty({ required: true })
  @IsInt()
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: true })
  @IsInt()
  userId: number;

  @ApiProperty({ required: true })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ required: true })
  @IsDateString()
  updatedAt: string;
}
