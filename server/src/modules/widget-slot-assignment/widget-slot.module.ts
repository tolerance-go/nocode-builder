import { Module } from '@nestjs/common';
import { WidgetSlotAssignmentService } from './widget-slot.service';
import { WidgetSlotAssignmentController } from './widget-slot.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WidgetSlotAssignmentController],
  providers: [WidgetSlotAssignmentService],
})
export class WidgetSlotAssignmentModule {}
