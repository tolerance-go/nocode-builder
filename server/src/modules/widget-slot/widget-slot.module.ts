import { Module } from '@nestjs/common';
import { WidgetSlotService } from './widget-slot.service';
import { WidgetSlotController } from './widget-slot.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WidgetSlotController],
  providers: [WidgetSlotService],
})
export class WidgetSlotModule {}
