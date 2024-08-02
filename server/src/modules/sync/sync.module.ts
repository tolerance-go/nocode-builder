import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProjectService } from '../project/project.service';
import { ProjectGroupService } from '../project-group/project-group.service';
import { BluemapProjectService } from '../bluemap-project/bluemap-project.service';
import { DataTableProjectService } from '../data-table-project/data-table-project.service';
import { ProjectDetailService } from '../project-detail/project-detail.service';
import { ViewProjectService } from '../view-project/view-project.service';

@Module({
  imports: [PrismaModule],
  controllers: [SyncController],
  providers: [
    ProjectGroupService,
    ProjectService,
    SyncService,
    ProjectDetailService,
    ViewProjectService,
    DataTableProjectService,
    BluemapProjectService,
  ],
})
export class SyncModule {}
