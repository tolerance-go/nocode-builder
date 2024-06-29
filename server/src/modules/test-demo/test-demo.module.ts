import { Module } from '@nestjs/common';
import { ProjectGroupService } from './test-demo.service';
import { ProjectGroupController } from './test-demo.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectGroupController],
  providers: [ProjectGroupService],
})
export class ProjectGroupModule {}
