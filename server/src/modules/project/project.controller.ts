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
  ProjectDto,
  ProjectQueryDto,
  ProjectCreateDto,
  ProjectUpdateDto,
} from './dtos';
import { toProjectDto } from './utils/toProjectDto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully fetched.',
    type: ProjectDto,
  })
  async getProject(@Param('id') id: string): Promise<ProjectDto | null> {
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
    type: [ProjectDto],
  })
  async getProjects(@Query() query: ProjectQueryDto): Promise<ProjectDto[]> {
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
    description: 'The project has been successfully created.',
    type: ProjectDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createProject(
    @Body() { projectGroupId, ...rest }: ProjectCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<ProjectDto> {
    const userId = req.user.id;
    const project = await this.projectService.createProject({
      ...rest,
      owner: {
        connect: {
          id: userId,
        },
      },
      projectGroup: projectGroupId
        ? {
            connect: {
              id: projectGroupId,
            },
          }
        : undefined,
    });
    return toProjectDto(project);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully updated.',
    type: ProjectDto,
  })
  async updateProject(
    @Param('id') id: string,
    @Body() data: ProjectUpdateDto,
  ): Promise<ProjectDto> {
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
    type: ProjectDto,
  })
  async deleteProject(@Param('id') id: string): Promise<ProjectDto> {
    const project = await this.projectService.deleteProject({
      id: Number(id),
    });
    return toProjectDto(project);
  }
}
