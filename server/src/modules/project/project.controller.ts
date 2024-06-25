import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Prisma } from '@prisma/client';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id')
  async getProject(@Param('id') id: string) {
    return this.projectService.project({ id: Number(id) });
  }

  @Get()
  async getProjects(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: Prisma.ProjectWhereInput,
    @Query('orderBy') orderBy?: Prisma.ProjectOrderByWithRelationInput,
  ) {
    return this.projectService.projects({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? { id: Number(cursor) } : undefined,
      where,
      orderBy,
    });
  }

  @Post()
  async createProject(@Body() data: Prisma.ProjectCreateInput) {
    return this.projectService.createProject(data);
  }

  @Patch(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() data: Prisma.ProjectUpdateInput,
  ) {
    return this.projectService.updateProject({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject({ id: Number(id) });
  }
}
