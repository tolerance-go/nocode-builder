import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class TimeChunkDto {
  @ApiProperty({
    description: 'id',
    required: false,
    nullable: true,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  id: int;

  @ApiProperty({ description: 'name', example: 1 })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'description',
    required: false,
    nullable: true,
    example: 1,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'userId', example: 1 })
  @IsInt()
  userId: int;

  @ApiProperty({ description: 'user', example: 1 })
  user: user;

  @ApiProperty({ description: 'timeNodes', example: 1 })
  timeNodes: timenode;

  @ApiProperty({ description: 'createdAt', example: 1 })
  @IsDateString()
  createdAt: datetime;

  @ApiProperty({ description: 'updatedAt', example: 1 })
  @IsDateString()
  updatedAt: datetime;
}
