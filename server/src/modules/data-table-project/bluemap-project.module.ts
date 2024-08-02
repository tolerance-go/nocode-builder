import { Module } from '@nestjs/common';
import { DataTableProjectService } from './bluemap-project.service';
import { DataTableProjectController } from './bluemap-project.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DataTableProjectController],
  providers: [DataTableProjectService],
})
export class DataTableProjectModule {}
