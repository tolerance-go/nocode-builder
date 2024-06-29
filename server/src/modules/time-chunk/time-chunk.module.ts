import { Module } from '@nestjs/common';
import { TimeChunkService } from './time-chunk.service';
import { TimeChunkController } from './time-chunk.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TimeChunkController],
  providers: [TimeChunkService],
})
export class TimeChunkModule {}
