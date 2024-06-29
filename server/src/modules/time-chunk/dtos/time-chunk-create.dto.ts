import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class TimeChunkCreateDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
