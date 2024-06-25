import { Module } from '@nestjs/common';
import { ProjectGroupService } from './project-group.service';
import { ProjectGroupController } from './project-group.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectGroupController],
  providers: [ProjectGroupService],
})
export class ProjectGroupModule {}
