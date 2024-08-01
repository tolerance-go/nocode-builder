import { WidgetSlot } from '@prisma/client';
import { WidgetSlotResponseDto } from '../dtos';

export function toWidgetSlotDto(widgetSlot: WidgetSlot): WidgetSlotResponseDto {
  return {
    id: widgetSlot.id,
    name: widgetSlot.name,
    ownerId: widgetSlot.ownerId,
    createdAt: widgetSlot.createdAt.toISOString(),
    updatedAt: widgetSlot.updatedAt.toISOString(),
  };
}
