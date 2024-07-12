import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtUserDto } from '../auth/dtos/jwt-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectGroupCreateDto } from './dtos/project-group-create.dto';
import { ProjectGroupQueryDto } from './dtos/project-group-query.dto';
import { ProjectGroupUpdateDto } from './dtos/project-group-update.dto';
import { ProjectGroupDto } from './dtos/project-group.dto';
import { ProjectGroupService } from './project-group.service';
import { toProjectGroupDto } from './utils/toProjectGroupDto';

@Controller('project-groups')
export class ProjectGroupController {
  constructor(private readonly projectGroupService: ProjectGroupService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully fetched.',
    type: ProjectGroupDto,
  })
  async getProjectGroup(
    @Param('id') id: string,
  ): Promise<ProjectGroupDto | null> {
    const projectGroup = await this.projectGroupService.projectGroup({
      id: Number(id),
    });
    return projectGroup ? toProjectGroupDto(projectGroup) : null;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The project groups have been successfully fetched.',
    type: [ProjectGroupDto],
  })
  async getProjectGroups(
    @Query() query: ProjectGroupQueryDto,
  ): Promise<ProjectGroupDto[]> {
    const projectGroups = await this.projectGroupService.projectGroups({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return projectGroups.map(toProjectGroupDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'The project group has been successfully created.',
    type: ProjectGroupDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createProjectGroup(
    @Body() data: ProjectGroupCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<ProjectGroupDto> {
    const { parentGroupId, ...rest } = data;
    const userId = req.user.id;
    const projectGroup = await this.projectGroupService.createProjectGroup({
      ...rest,
      owner: {
        connect: {
          id: userId,
        },
      },
      parentGroup: parentGroupId
        ? {
            connect: {
              id: parentGroupId,
            },
          }
        : undefined,
    });
    return toProjectGroupDto(projectGroup);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully updated.',
    type: ProjectGroupDto,
  })
  async updateProjectGroup(
    @Param('id') id: string,
    @Body() data: ProjectGroupUpdateDto,
  ): Promise<ProjectGroupDto> {
    const projectGroup = await this.projectGroupService.updateProjectGroup({
      where: { id: Number(id) },
      data,
    });
    return toProjectGroupDto(projectGroup);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully deleted.',
    type: ProjectGroupDto,
  })
  async deleteProjectGroup(@Param('id') id: string): Promise<ProjectGroupDto> {
    const projectGroup = await this.projectGroupService.deleteProjectGroup({
      id: Number(id),
    });
    return toProjectGroupDto(projectGroup);
  }
}
