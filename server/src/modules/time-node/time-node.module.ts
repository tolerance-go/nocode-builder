import { Module } from '@nestjs/common';
import { TimeNodeService } from './time-node.service';
import { TimeNodeController } from './time-node.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TimeNodeController],
  providers: [TimeNodeService],
})
export class TimeNodeModule {}
