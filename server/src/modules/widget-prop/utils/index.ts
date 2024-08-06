import { WidgetProp } from '@prisma/client';
import { WidgetPropResponseDto } from '../dtos';

export function toWidgetPropResponseDto(
  record: WidgetProp,
): WidgetPropResponseDto {
  return {
    id: record.id,
    key: record.key,
    jsonValue: record.jsonValue,
    stringValue: record.stringValue ?? undefined,
    numberValue: record.numberValue ?? undefined,
    boolValue: record.boolValue ?? undefined,
    widgetId: record.widgetId ?? undefined,
    widgetInstanceId: record.widgetInstanceId ?? undefined,
    valueType: record.valueType,
    ownerId: record.ownerId,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
