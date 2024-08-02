import { ApiProperty } from '@nestjs/swagger';
import { OperationType } from '@unocode/common';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { TableName } from '@unocode/common';
import {
  UserModelRecordDto,
  ProjectModelRecordDto,
  ProjectGroupModelRecordDto,
  BluemapProjectModelRecordDto,
  DataTableProjectModelRecordDto,
  ProjectDetailModelRecordDto,
  ViewProjectModelRecordDto,
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

  @ApiProperty({
    type: () => ProjectDetailModelRecordDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectDetailModelRecordDto)
  projectDetailOperationRecord?: ProjectDetailModelRecordDto;

  @ApiProperty({
    type: () => ViewProjectModelRecordDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ViewProjectModelRecordDto)
  viewProjectOperationRecord?: ViewProjectModelRecordDto;

  @ApiProperty({
    type: () => DataTableProjectModelRecordDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DataTableProjectModelRecordDto)
  dataTableProjectOperationRecord?: DataTableProjectModelRecordDto;

  @ApiProperty({
    type: () => BluemapProjectModelRecordDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => BluemapProjectModelRecordDto)
  bluemapProjectOperationRecord?: BluemapProjectModelRecordDto;
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
