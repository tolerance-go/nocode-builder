import { Module } from '@nestjs/common';
import { ProjectGroupUpdateOperationService } from './project-group-update-operation.service';
import { ProjectGroupUpdateOperationController } from './project-group-update-operation.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectGroupUpdateOperationController],
  providers: [ProjectGroupUpdateOperationService],
})
export class ProjectGroupUpdateOperationModule {}
