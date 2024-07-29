import { ApiProperty } from '@nestjs/swagger';
import { OperationType } from '@unocode/common';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ProjectGroupOperationRecordDto } from 'src/_gen/dtos/operation-records/ProjectGroupOperationRecordDto';
import { ProjectOperationRecordDto } from 'src/_gen/dtos/operation-records/ProjectOperationRecordDto';
import { UserOperationRecordDto } from 'src/_gen/dtos/operation-records/UserOperationRecordDto';

class OperationRecordUnion {
  @ApiProperty({ type: () => UserOperationRecordDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserOperationRecordDto)
  userOperationRecord?: UserOperationRecordDto;

  @ApiProperty({ type: () => ProjectOperationRecordDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectOperationRecordDto)
  projectOperationRecord?: ProjectOperationRecordDto;

  @ApiProperty({ type: () => ProjectGroupOperationRecordDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectGroupOperationRecordDto)
  projectGroupOperationRecord?: ProjectGroupOperationRecordDto;
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
    // 这里不用 oneOf 是以为无法解决循环依赖报错（forwardRef不起作用）
    type: Object,
  })
  @ValidateNested()
  @Type(() => OperationRecordUnion)
  record: OperationRecordUnion;
}

export class OperationsDto {
  @ApiProperty({
    type: [OperationDto],
  })
  @ValidateNested({ each: true })
  @Type(() => OperationDto)
  operations: OperationDto[];
}
