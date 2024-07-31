import { Widget } from '@prisma/client';
import { WidgetResponseDto } from '../dtos';

export function toWidgetDto(widget: Widget): WidgetResponseDto {
  return {
    id: widget.id,
    elementType: widget.elementType,
    ownerId: widget.ownerId,
    createdAt: widget.createdAt.toISOString(),
    updatedAt: widget.updatedAt.toISOString(),
  };
}
