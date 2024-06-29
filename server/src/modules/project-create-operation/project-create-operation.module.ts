import { Module } from '@nestjs/common';
import { ProjectCreateOperationService } from './project-create-operation.service';
import { ProjectCreateOperationController } from './project-create-operation.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectCreateOperationController],
  providers: [ProjectCreateOperationService],
})
export class ProjectCreateOperationModule {}
