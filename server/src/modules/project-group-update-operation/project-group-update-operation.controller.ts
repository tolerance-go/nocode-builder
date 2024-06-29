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
import { ProjectGroupUpdateOperationCreateDto } from './dtos/project-group-update-operation-create.dto';
import { ProjectGroupUpdateOperationQueryDto } from './dtos/project-group-update-operation-query.dto';
import { ProjectGroupUpdateOperationUpdateDto } from './dtos/project-group-update-operation-update.dto';
import { ProjectGroupUpdateOperationDto } from './dtos/project-group-update-operation.dto';
import { ProjectGroupUpdateOperationService } from './project-group-update-operation.service';
import { toProjectGroupUpdateOperationDto } from './utils/toProjectGroupUpdateOperationDto';

@Controller('project-groups')
export class ProjectGroupUpdateOperationController {
  constructor(
    private readonly projectGroupUpdateOperationService: ProjectGroupUpdateOperationService,
  ) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully fetched.',
    type: ProjectGroupUpdateOperationDto,
  })
  async getProjectGroupUpdateOperation(
    @Param('id') id: string,
  ): Promise<ProjectGroupUpdateOperationDto | null> {
    const projectGroupUpdateOperation =
      await this.projectGroupUpdateOperationService.projectGroupUpdateOperation(
        {
          id: Number(id),
        },
      );
    return projectGroupUpdateOperation
      ? toProjectGroupUpdateOperationDto(projectGroupUpdateOperation)
      : null;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The project groups have been successfully fetched.',
    type: [ProjectGroupUpdateOperationDto],
  })
  async getProjectGroupUpdateOperations(
    @Query() query: ProjectGroupUpdateOperationQueryDto,
  ): Promise<ProjectGroupUpdateOperationDto[]> {
    const projectGroupUpdateOperations =
      await this.projectGroupUpdateOperationService.projectGroupUpdateOperations(
        {
          skip: query.skip,
          take: query.take,
          cursor: query.filter ? { id: Number(query.filter) } : undefined,
          orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
        },
      );
    return projectGroupUpdateOperations.map(toProjectGroupUpdateOperationDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'The project group has been successfully created.',
    type: ProjectGroupUpdateOperationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createProjectGroupUpdateOperation(
    @Body() data: ProjectGroupUpdateOperationCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<ProjectGroupUpdateOperationDto> {
    const { ...rest } = data;
    const userId = req.user.id;
    const projectGroupUpdateOperation =
      await this.projectGroupUpdateOperationService.createProjectGroupUpdateOperation(
        {
          ...rest,
          owner: {
            connect: {
              id: userId,
            },
          },
        },
      );
    return toProjectGroupUpdateOperationDto(projectGroupUpdateOperation);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully updated.',
    type: ProjectGroupUpdateOperationDto,
  })
  async updateProjectGroupUpdateOperation(
    @Param('id') id: string,
    @Body() data: ProjectGroupUpdateOperationUpdateDto,
  ): Promise<ProjectGroupUpdateOperationDto> {
    const projectGroupUpdateOperation =
      await this.projectGroupUpdateOperationService.updateProjectGroupUpdateOperation(
        {
          where: { id: Number(id) },
          data,
        },
      );
    return toProjectGroupUpdateOperationDto(projectGroupUpdateOperation);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully deleted.',
    type: ProjectGroupUpdateOperationDto,
  })
  async deleteProjectGroupUpdateOperation(
    @Param('id') id: string,
  ): Promise<ProjectGroupUpdateOperationDto> {
    const projectGroupUpdateOperation =
      await this.projectGroupUpdateOperationService.deleteProjectGroupUpdateOperation(
        {
          id: Number(id),
        },
      );
    return toProjectGroupUpdateOperationDto(projectGroupUpdateOperation);
  }
}
