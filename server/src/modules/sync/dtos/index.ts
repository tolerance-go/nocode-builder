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
