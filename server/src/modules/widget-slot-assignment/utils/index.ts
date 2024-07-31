import { WidgetSlotAssignment } from '@prisma/client';
import { WidgetSlotAssignmentResponseDto } from '../dtos';

export function toWidgetSlotAssignmentDto(
  widgetSlotAssignment: WidgetSlotAssignment,
): WidgetSlotAssignmentResponseDto {
  return {
    widgetId: widgetSlotAssignment.widgetId,
    slotId: widgetSlotAssignment.slotId,
    ownerId: widgetSlotAssignment.ownerId,
    assignedAt: widgetSlotAssignment.assignedAt.toISOString(),
  };
}
