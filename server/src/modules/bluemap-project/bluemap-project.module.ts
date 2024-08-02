import { Module } from '@nestjs/common';
import { BluemapProjectService } from './bluemap-project.service';
import { BluemapProjectController } from './bluemap-project.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BluemapProjectController],
  providers: [BluemapProjectService],
})
export class BluemapProjectModule {}
