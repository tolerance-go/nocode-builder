import { ApiProperty } from '@nestjs/swagger';
import { OperationType } from '@unocode/common';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import {
  UserModelRecordDto,
  ProjectModelRecordDto,
  ProjectGroupModelRecordDto,
} from 'src/_gen/dtos/model-records';

class OperationRecordUnionDto {
  @ApiProperty({ type: () => UserModelRecordDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserModelRecordDto)
  userOperationRecord?: UserModelRecordDto;

  @ApiProperty({ type: () => ProjectModelRecordDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectModelRecordDto)
  projectOperationRecord?: ProjectModelRecordDto;

  @ApiProperty({ type: () => ProjectGroupModelRecordDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectGroupModelRecordDto)
  projectGroupOperationRecord?: ProjectGroupModelRecordDto;
}

export class OperationDto {
  @ApiProperty({
    type: String,
  })
  tableName: string;

  @ApiProperty({
    enum: OperationType,
  })
  operation: OperationType;

  @ApiProperty({
    type: OperationRecordUnionDto,
  })
  @ValidateNested()
  @Type(() => OperationRecordUnionDto)
  record: OperationRecordUnionDto;
}

export class OperationsDto {
  @ApiProperty({
    type: [OperationDto],
  })
  @ValidateNested({ each: true })
  @Type(() => OperationDto)
  operations: OperationDto[];
}
