import { Module } from '@nestjs/common';
import { ProjectOperationService } from './project-operation.service';
import { ProjectOperationController } from './project-operation.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectOperationController],
  providers: [ProjectOperationService],
})
export class ProjectOperationModule {}
