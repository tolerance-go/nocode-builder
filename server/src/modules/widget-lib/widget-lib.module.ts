import { Module } from '@nestjs/common';
import { WidgetLibService } from './widget-lib.service';
import { WidgetLibController } from './widget-lib.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WidgetLibController],
  providers: [WidgetLibService],
})
export class WidgetLibModule {}
