import { Module } from '@nestjs/common';
import { ProjectDeleteOperationService } from './project-delete-operation.service';
import { ProjectDeleteOperationController } from './project-delete-operation.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectDeleteOperationController],
  providers: [ProjectDeleteOperationService],
})
export class ProjectDeleteOperationModule {}
