import {
  UserModelRecordDto,
  ProjectModelRecordDto,
  ProjectGroupModelRecordDto,
} from '@/_gen/api';
import {
  UserModelRecord,
  ProjectModelRecord,
  ProjectGroupModelRecord,
} from '@/_gen/model-records';

export function convertUserDatesToISO(
  record: UserModelRecord,
): UserModelRecordDto {
  const { createdAt, updatedAt, ...rest } = record;

  return {
    ...rest,
    createdAt: createdAt instanceof Date ? createdAt.toISOString() : createdAt,
    updatedAt: updatedAt instanceof Date ? updatedAt.toISOString() : updatedAt,
  };
}

export function convertProjectDatesToISO(
  record: ProjectModelRecord,
): ProjectModelRecordDto {
  const { createdAt, updatedAt, ...rest } = record;

  return {
    ...rest,
    createdAt: createdAt instanceof Date ? createdAt.toISOString() : createdAt,
    updatedAt: updatedAt instanceof Date ? updatedAt.toISOString() : updatedAt,
  };
}

export function convertProjectGroupDatesToISO(
  record: ProjectGroupModelRecord,
): ProjectGroupModelRecordDto {
  const { createdAt, updatedAt, ...rest } = record;

  return {
    ...rest,
    createdAt: createdAt instanceof Date ? createdAt.toISOString() : createdAt,
    updatedAt: updatedAt instanceof Date ? updatedAt.toISOString() : updatedAt,
  };
}
