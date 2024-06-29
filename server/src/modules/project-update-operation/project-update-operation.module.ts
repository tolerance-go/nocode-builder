import { Module } from '@nestjs/common';
import { ProjectUpdateOperationService } from './project-update-operation.service';
import { ProjectUpdateOperationController } from './project-update-operation.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectUpdateOperationController],
  providers: [ProjectUpdateOperationService],
})
export class ProjectUpdateOperationModule {}
