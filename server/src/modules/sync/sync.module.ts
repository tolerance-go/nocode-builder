import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProjectService } from '../project/project.service';
import { ProjectGroupService } from '../project-group/project-group.service';

@Module({
  imports: [PrismaModule],
  controllers: [SyncController],
  providers: [ProjectGroupService, ProjectService, SyncService],
})
export class SyncModule {}
