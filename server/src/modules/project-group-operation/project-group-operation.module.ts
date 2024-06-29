import { Module } from '@nestjs/common';
import { ProjectGroupOperationService } from './project-group-operation.service';
import { ProjectGroupOperationController } from './project-group-operation.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectGroupOperationController],
  providers: [ProjectGroupOperationService],
})
export class ProjectGroupOperationModule {}
