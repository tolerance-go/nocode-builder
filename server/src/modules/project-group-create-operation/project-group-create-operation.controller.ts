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
import { ProjectGroupCreateOperationCreateDto } from './dtos/project-group-create-operation-create.dto';
import { ProjectGroupCreateOperationQueryDto } from './dtos/project-group-create-operation-query.dto';
import { ProjectGroupCreateOperationUpdateDto } from './dtos/project-group-create-operation-update.dto';
import { ProjectGroupCreateOperationDto } from './dtos/project-group-create-operation.dto';
import { ProjectGroupCreateOperationService } from './project-group-create-operation.service';
import { toProjectGroupCreateOperationDto } from './utils/toProjectGroupCreateOperationDto';

@Controller('project-groups')
export class ProjectGroupCreateOperationController {
  constructor(private readonly projectGroupCreateOperationService: ProjectGroupCreateOperationService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully fetched.',
    type: ProjectGroupCreateOperationDto,
  })
  async getProjectGroupCreateOperation(
    @Param('id') id: string,
  ): Promise<ProjectGroupCreateOperationDto | null> {
    const projectGroupCreateOperation = await this.projectGroupCreateOperationService.projectGroupCreateOperation({
      id: Number(id),
    });
    return projectGroupCreateOperation ? toProjectGroupCreateOperationDto(projectGroupCreateOperation) : null;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The project groups have been successfully fetched.',
    type: [ProjectGroupCreateOperationDto],
  })
  async getProjectGroupCreateOperations(
    @Query() query: ProjectGroupCreateOperationQueryDto,
  ): Promise<ProjectGroupCreateOperationDto[]> {
    const projectGroupCreateOperations = await this.projectGroupCreateOperationService.projectGroupCreateOperations({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return projectGroupCreateOperations.map(toProjectGroupCreateOperationDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'The project group has been successfully created.',
    type: ProjectGroupCreateOperationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createProjectGroupCreateOperation(
    @Body() data: ProjectGroupCreateOperationCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<ProjectGroupCreateOperationDto> {
    const { parentGroupId, ...rest } = data;
    const userId = req.user.id;
    const projectGroupCreateOperation = await this.projectGroupCreateOperationService.createProjectGroupCreateOperation({
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
    return toProjectGroupCreateOperationDto(projectGroupCreateOperation);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully updated.',
    type: ProjectGroupCreateOperationDto,
  })
  async updateProjectGroupCreateOperation(
    @Param('id') id: string,
    @Body() data: ProjectGroupCreateOperationUpdateDto,
  ): Promise<ProjectGroupCreateOperationDto> {
    const projectGroupCreateOperation = await this.projectGroupCreateOperationService.updateProjectGroupCreateOperation({
      where: { id: Number(id) },
      data,
    });
    return toProjectGroupCreateOperationDto(projectGroupCreateOperation);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully deleted.',
    type: ProjectGroupCreateOperationDto,
  })
  async deleteProjectGroupCreateOperation(@Param('id') id: string): Promise<ProjectGroupCreateOperationDto> {
    const projectGroupCreateOperation = await this.projectGroupCreateOperationService.deleteProjectGroupCreateOperation({
      id: Number(id),
    });
    return toProjectGroupCreateOperationDto(projectGroupCreateOperation);
  }
}
