import { ApiProperty } from '@nestjs/swagger';
import { OperationType } from '@unocode/common';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { TableName } from '@unocode/common';
import {
  UserModelRecordDto,
  ProjectModelRecordDto,
  ProjectGroupModelRecordDto,
} from 'src/_gen/dtos/model-records';

class OperationRecordUnionDto {
  @ApiProperty({
    type: () => UserModelRecordDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserModelRecordDto)
  userOperationRecord?: UserModelRecordDto;

  @ApiProperty({
    type: () => ProjectModelRecordDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectModelRecordDto)
  projectOperationRecord?: ProjectModelRecordDto;

  @ApiProperty({
    type: () => ProjectGroupModelRecordDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectGroupModelRecordDto)
  projectGroupOperationRecord?: ProjectGroupModelRecordDto;
}

export class OperationDto {
  @ApiProperty({
    enum: TableName,
  })
  @IsEnum(TableName)
  tableName: TableName;

  @ApiProperty({
    enum: OperationType,
  })
  @IsEnum(OperationType)
  operation: OperationType;

  @ApiProperty({
    type: OperationRecordUnionDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => OperationRecordUnionDto)
  @IsOptional()
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
