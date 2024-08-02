import { Module } from '@nestjs/common';
import { BluemapProjectService } from './data-table-project.service';
import { BluemapProjectController } from './data-table-project.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BluemapProjectController],
  providers: [BluemapProjectService],
})
export class BluemapProjectModule {}
