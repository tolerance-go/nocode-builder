import { Module } from '@nestjs/common';
import { ProjectGroupDeleteOperationService } from './project-group-delete-operation.service';
import { ProjectGroupDeleteOperationController } from './project-group-delete-operation.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectGroupDeleteOperationController],
  providers: [ProjectGroupDeleteOperationService],
})
export class ProjectGroupDeleteOperationModule {}
