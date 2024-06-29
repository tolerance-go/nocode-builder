import { Module } from '@nestjs/common';
import { ProjectGroupCreateOperationService } from './project-group-create-operation.service';
import { ProjectGroupCreateOperationController } from './project-group-create-operation.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectGroupCreateOperationController],
  providers: [ProjectGroupCreateOperationService],
})
export class ProjectGroupCreateOperationModule {}
