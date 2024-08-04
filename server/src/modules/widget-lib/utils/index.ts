import { WidgetLib } from '@prisma/client';
import { WidgetLibResponseDto } from '../dtos';

export function toWidgetLibDto(record: WidgetLib): WidgetLibResponseDto {
  return {
    id: record.id,
    name: record.name,
    ownerId: record.ownerId,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
