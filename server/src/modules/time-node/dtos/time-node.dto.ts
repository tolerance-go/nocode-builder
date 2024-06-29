import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class TimeNodeDto {
  @ApiProperty({ required: true })
  @IsInt()
  id: number;

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

  @ApiProperty({ required: true })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ required: true })
  @IsDateString()
  updatedAt: string;
}
