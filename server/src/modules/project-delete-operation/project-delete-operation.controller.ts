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
import { ProjectDeleteOperationCreateDto } from './dtos/project-delete-operation-create.dto';
import { ProjectDeleteOperationQueryDto } from './dtos/project-delete-operation-query.dto';
import { ProjectDeleteOperationUpdateDto } from './dtos/project-delete-operation-update.dto';
import { ProjectDeleteOperationDto } from './dtos/project-delete-operation.dto';
import { ProjectDeleteOperationService } from './project-delete-operation.service';
import { toProjectDeleteOperationDto } from './utils/toProjectDeleteOperationDto';

@Controller('project-groups')
export class ProjectDeleteOperationController {
  constructor(private readonly projectDeleteOperationService: ProjectDeleteOperationService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully fetched.',
    type: ProjectDeleteOperationDto,
  })
  async getProjectDeleteOperation(
    @Param('id') id: string,
  ): Promise<ProjectDeleteOperationDto | null> {
    const projectDeleteOperation = await this.projectDeleteOperationService.projectDeleteOperation({
      id: Number(id),
    });
    return projectDeleteOperation ? toProjectDeleteOperationDto(projectDeleteOperation) : null;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The project groups have been successfully fetched.',
    type: [ProjectDeleteOperationDto],
  })
  async getProjectDeleteOperations(
    @Query() query: ProjectDeleteOperationQueryDto,
  ): Promise<ProjectDeleteOperationDto[]> {
    const projectDeleteOperations = await this.projectDeleteOperationService.projectDeleteOperations({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return projectDeleteOperations.map(toProjectDeleteOperationDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'The project group has been successfully created.',
    type: ProjectDeleteOperationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createProjectDeleteOperation(
    @Body() data: ProjectDeleteOperationCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<ProjectDeleteOperationDto> {
    const { parentGroupId, ...rest } = data;
    const userId = req.user.id;
    const projectDeleteOperation = await this.projectDeleteOperationService.createProjectDeleteOperation({
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
    return toProjectDeleteOperationDto(projectDeleteOperation);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully updated.',
    type: ProjectDeleteOperationDto,
  })
  async updateProjectDeleteOperation(
    @Param('id') id: string,
    @Body() data: ProjectDeleteOperationUpdateDto,
  ): Promise<ProjectDeleteOperationDto> {
    const projectDeleteOperation = await this.projectDeleteOperationService.updateProjectDeleteOperation({
      where: { id: Number(id) },
      data,
    });
    return toProjectDeleteOperationDto(projectDeleteOperation);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully deleted.',
    type: ProjectDeleteOperationDto,
  })
  async deleteProjectDeleteOperation(@Param('id') id: string): Promise<ProjectDeleteOperationDto> {
    const projectDeleteOperation = await this.projectDeleteOperationService.deleteProjectDeleteOperation({
      id: Number(id),
    });
    return toProjectDeleteOperationDto(projectDeleteOperation);
  }
}
