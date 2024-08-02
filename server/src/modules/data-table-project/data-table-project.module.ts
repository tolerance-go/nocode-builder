import { Module } from '@nestjs/common';
import { DataTableProjectService } from './data-table-project.service';
import { DataTableProjectController } from './data-table-project.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DataTableProjectController],
  providers: [DataTableProjectService],
})
export class DataTableProjectModule {}
