import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Project } from '@prisma/client';
import {
  ProjectGroupOperationRecordDto,
  ProjectOperationRecordDto,
  UserOperationRecordDto,
} from 'src/_gen/dtos';
import { OperationType } from 'src/common/enums/operation-type';
import { ProjectGroupResponseDto } from 'src/modules/project-group/dtos';

export class OperationsDto {
  @ApiProperty({
    type: String,
  })
  tableName: string;

  @ApiProperty({
    enum: OperationType,
  })
  operation: OperationType;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(UserOperationRecordDto) },
      { $ref: getSchemaPath(ProjectOperationRecordDto) },
      { $ref: getSchemaPath(ProjectGroupOperationRecordDto) },
    ],
  })
  record: Project | ProjectGroupResponseDto;
}
