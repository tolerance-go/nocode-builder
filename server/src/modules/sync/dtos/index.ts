import { ApiProperty } from '@nestjs/swagger';
import {
  ProjectGroupOperationRecordDto,
  ProjectOperationRecordDto,
  UserOperationRecordDto,
} from 'src/_gen/dtos';
import { OperationType } from 'src/common/enums/operation-type';

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
  record:
    | UserOperationRecordDto
    | ProjectOperationRecordDto
    | ProjectGroupOperationRecordDto;
}

export class OperationsDto {
  @ApiProperty({
    type: [OperationDto],
  })
  operations: OperationDto[];
}
