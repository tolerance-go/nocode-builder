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
import { ProjectGroupDeleteOperationCreateDto } from './dtos/project-group-delete-operation-create.dto';
import { ProjectGroupDeleteOperationQueryDto } from './dtos/project-group-delete-operation-query.dto';
import { ProjectGroupDeleteOperationUpdateDto } from './dtos/project-group-delete-operation-update.dto';
import { ProjectGroupDeleteOperationDto } from './dtos/project-group-delete-operation.dto';
import { ProjectGroupDeleteOperationService } from './project-group-delete-operation.service';
import { toProjectGroupDeleteOperationDto } from './utils/toProjectGroupDeleteOperationDto';

@Controller('project-groups')
export class ProjectGroupDeleteOperationController {
  constructor(private readonly projectGroupDeleteOperationService: ProjectGroupDeleteOperationService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully fetched.',
    type: ProjectGroupDeleteOperationDto,
  })
  async getProjectGroupDeleteOperation(
    @Param('id') id: string,
  ): Promise<ProjectGroupDeleteOperationDto | null> {
    const projectGroupDeleteOperation = await this.projectGroupDeleteOperationService.projectGroupDeleteOperation({
      id: Number(id),
    });
    return projectGroupDeleteOperation ? toProjectGroupDeleteOperationDto(projectGroupDeleteOperation) : null;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The project groups have been successfully fetched.',
    type: [ProjectGroupDeleteOperationDto],
  })
  async getProjectGroupDeleteOperations(
    @Query() query: ProjectGroupDeleteOperationQueryDto,
  ): Promise<ProjectGroupDeleteOperationDto[]> {
    const projectGroupDeleteOperations = await this.projectGroupDeleteOperationService.projectGroupDeleteOperations({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return projectGroupDeleteOperations.map(toProjectGroupDeleteOperationDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'The project group has been successfully created.',
    type: ProjectGroupDeleteOperationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createProjectGroupDeleteOperation(
    @Body() data: ProjectGroupDeleteOperationCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<ProjectGroupDeleteOperationDto> {
    const { parentGroupId, ...rest } = data;
    const userId = req.user.id;
    const projectGroupDeleteOperation = await this.projectGroupDeleteOperationService.createProjectGroupDeleteOperation({
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
    return toProjectGroupDeleteOperationDto(projectGroupDeleteOperation);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully updated.',
    type: ProjectGroupDeleteOperationDto,
  })
  async updateProjectGroupDeleteOperation(
    @Param('id') id: string,
    @Body() data: ProjectGroupDeleteOperationUpdateDto,
  ): Promise<ProjectGroupDeleteOperationDto> {
    const projectGroupDeleteOperation = await this.projectGroupDeleteOperationService.updateProjectGroupDeleteOperation({
      where: { id: Number(id) },
      data,
    });
    return toProjectGroupDeleteOperationDto(projectGroupDeleteOperation);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully deleted.',
    type: ProjectGroupDeleteOperationDto,
  })
  async deleteProjectGroupDeleteOperation(@Param('id') id: string): Promise<ProjectGroupDeleteOperationDto> {
    const projectGroupDeleteOperation = await this.projectGroupDeleteOperationService.deleteProjectGroupDeleteOperation({
      id: Number(id),
    });
    return toProjectGroupDeleteOperationDto(projectGroupDeleteOperation);
  }
}
