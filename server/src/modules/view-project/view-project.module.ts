import { Module } from '@nestjs/common';
import { ViewProjectService } from './view-project.service';
import { ViewProjectController } from './view-project.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ViewProjectController],
  providers: [ViewProjectService],
})
export class ViewProjectModule {}
