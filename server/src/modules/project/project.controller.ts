import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtUserDto } from '../auth/dtos/jwt-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectService } from './project.service';
import {
  ProjectResponseDto,
  ProjectQueryDto,
  ProjectCreateDto,
  ProjectUpdateDto,
} from './dtos';
import { toProjectDto } from './utils';
import { Prisma } from '@prisma/client';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('detail/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully fetched.',
    type: ProjectResponseDto,
  })
  async getProject(
    @Param('id') id: string,
  ): Promise<ProjectResponseDto | null> {
    const project = await this.projectService.project({
      id: Number(id),
    });
    return project ? toProjectDto(project) : null;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The projects have been successfully fetched.',
    type: [ProjectResponseDto],
  })
  async getProjects(
    @Query() query: ProjectQueryDto,
  ): Promise<ProjectResponseDto[]> {
    const projects = await this.projectService.projects({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return projects.map(toProjectDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createProject(
    @Body() { projectGroupId, projectDetailId, ...rest }: ProjectCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<ProjectResponseDto> {
    const userId = req.user.id;
    const id = await this.projectService.getNextProjectId();

    const projectData: Prisma.ProjectCreateInput = {
      id,
      ...rest,
      owner: {
        connect: {
          id: userId,
        },
      },
      projectDetail: {
        connect: {
          id: projectDetailId,
        },
      },
    };

    if (projectGroupId) {
      projectData.projectGroup = {
        connect: {
          id: projectGroupId,
        },
      };
    }

    const project = await this.projectService.createProject(projectData);
    return toProjectDto(project);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully updated.',
    type: ProjectResponseDto,
  })
  async updateProject(
    @Param('id') id: string,
    @Body() data: ProjectUpdateDto,
  ): Promise<ProjectResponseDto> {
    const project = await this.projectService.updateProject({
      where: { id: Number(id) },
      data,
    });
    return toProjectDto(project);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully deleted.',
    type: ProjectResponseDto,
  })
  async deleteProject(@Param('id') id: string): Promise<ProjectResponseDto> {
    const project = await this.projectService.deleteProject({
      id: Number(id),
    });
    return toProjectDto(project);
  }
}
