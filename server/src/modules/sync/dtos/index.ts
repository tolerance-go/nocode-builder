import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import {
  ProjectGroupOperationRecordDto,
  ProjectOperationRecordDto,
  UserOperationRecordDto,
} from 'src/_gen/dtos';
import { OperationType } from 'src/common/enums/operation-type';

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
