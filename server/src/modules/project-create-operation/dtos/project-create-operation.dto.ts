import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';

export class ProjectCreateOperationDto {
  @ApiProperty({ required: true })
  @IsInt()
  id: number;

  @ApiProperty({ required: true })
  @IsInt()
  recordId: number;

  @ApiProperty({ required: true })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ required: true })
  @IsDateString()
  updatedAt: string;

  @ApiProperty({ required: true })
  @IsInt()
  projectOperationId: number;
}
