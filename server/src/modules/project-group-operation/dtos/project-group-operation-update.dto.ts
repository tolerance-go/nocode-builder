import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class ProjectGroupOperationUpdateDto {
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsInt()
  projectGroupId?: number;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsInt()
  projectGroupCreateOperationId?: number;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsInt()
  projectGroupUpdateOperationId?: number;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsInt()
  projectGroupDeleteOperationId?: number;
}
