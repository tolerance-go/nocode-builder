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
import { ProjectGroupService } from './project-group.service';
import { toProjectGroupDto } from './utils';
import {
  ProjectGroupResponseDto,
  ProjectGroupQueryDto,
  ProjectGroupCreateDto,
  ProjectGroupUpdateDto,
} from './dtos';

@Controller('project-groups')
export class ProjectGroupController {
  constructor(private readonly projectGroupService: ProjectGroupService) {}

  @Get('detail/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully fetched.',
    type: ProjectGroupResponseDto,
  })
  async getProjectGroup(
    @Param('id') id: string,
  ): Promise<ProjectGroupResponseDto | null> {
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
    type: [ProjectGroupResponseDto],
  })
  async getProjectGroups(
    @Query() query: ProjectGroupQueryDto,
  ): Promise<ProjectGroupResponseDto[]> {
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
    type: ProjectGroupResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createProjectGroup(
    @Body() data: ProjectGroupCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<ProjectGroupResponseDto> {
    const { parentGroupId, ...rest } = data;
    const userId = req.user.id;
    const id = await this.projectGroupService.getNextProjectGroupId();
    const projectGroup = await this.projectGroupService.createProjectGroup({
      id,
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
    type: ProjectGroupResponseDto,
  })
  async updateProjectGroup(
    @Param('id') id: string,
    @Body() data: ProjectGroupUpdateDto,
  ): Promise<ProjectGroupResponseDto> {
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
    type: ProjectGroupResponseDto,
  })
  async deleteProjectGroup(
    @Param('id') id: string,
  ): Promise<ProjectGroupResponseDto> {
    const projectGroup = await this.projectGroupService.deleteProjectGroup({
      id: Number(id),
    });
    return toProjectGroupDto(projectGroup);
  }
}
