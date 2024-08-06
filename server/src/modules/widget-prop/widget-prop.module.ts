import { Module } from '@nestjs/common';
import { WidgetPropService } from './widget-prop.service';
import { WidgetPropController } from './widget-prop.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WidgetPropController],
  providers: [WidgetPropService],
})
export class WidgetPropModule {}
