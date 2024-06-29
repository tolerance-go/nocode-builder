import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  // Post,
  Query,
  // Req,
  // UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
// import { JwtUserDto } from '../auth/dtos/jwt-user.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { ProjectGroupOperationCreateDto } from './dtos/project-group-operation-create.dto';
import { ProjectGroupOperationQueryDto } from './dtos/project-group-operation-query.dto';
import { ProjectGroupOperationUpdateDto } from './dtos/project-group-operation-update.dto';
import { ProjectGroupOperationDto } from './dtos/project-group-operation.dto';
import { ProjectGroupOperationService } from './project-group-operation.service';
import { toProjectGroupOperationDto } from './utils/toProjectGroupOperationDto';

@Controller('project-groups')
export class ProjectGroupOperationController {
  constructor(
    private readonly projectGroupOperationService: ProjectGroupOperationService,
  ) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully fetched.',
    type: ProjectGroupOperationDto,
  })
  async getProjectGroupOperation(
    @Param('id') id: string,
  ): Promise<ProjectGroupOperationDto | null> {
    const projectGroupOperation =
      await this.projectGroupOperationService.projectGroupOperation({
        id: Number(id),
      });
    return projectGroupOperation
      ? toProjectGroupOperationDto(projectGroupOperation)
      : null;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The project groups have been successfully fetched.',
    type: [ProjectGroupOperationDto],
  })
  async getProjectGroupOperations(
    @Query() query: ProjectGroupOperationQueryDto,
  ): Promise<ProjectGroupOperationDto[]> {
    const projectGroupOperations =
      await this.projectGroupOperationService.projectGroupOperations({
        skip: query.skip,
        take: query.take,
        cursor: query.filter ? { id: Number(query.filter) } : undefined,
        orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
      });
    return projectGroupOperations.map(toProjectGroupOperationDto);
  }

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiResponse({
  //   status: 201,
  //   description: 'The project group has been successfully created.',
  //   type: ProjectGroupOperationDto,
  // })
  // @ApiResponse({ status: 400, description: 'Bad Request.' })
  // async createProjectGroupOperation(
  //   @Body() data: ProjectGroupOperationCreateDto,
  //   @Req() req: Request & { user: JwtUserDto },
  // ): Promise<ProjectGroupOperationDto> {
  //   const { ...rest } = data;
  //   const userId = req.user.id;
  //   const projectGroupOperation =
  //     await this.projectGroupOperationService.createProjectGroupOperation(
  //       {
  //         ...rest,
  //         owner: {
  //           connect: {
  //             id: userId,
  //           },
  //         },
  //       },
  //     );
  //   return toProjectGroupOperationDto(projectGroupOperation);
  // }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully updated.',
    type: ProjectGroupOperationDto,
  })
  async updateProjectGroupOperation(
    @Param('id') id: string,
    @Body() data: ProjectGroupOperationUpdateDto,
  ): Promise<ProjectGroupOperationDto> {
    const projectGroupOperation =
      await this.projectGroupOperationService.updateProjectGroupOperation({
        where: { id: Number(id) },
        data,
      });
    return toProjectGroupOperationDto(projectGroupOperation);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully deleted.',
    type: ProjectGroupOperationDto,
  })
  async deleteProjectGroupOperation(
    @Param('id') id: string,
  ): Promise<ProjectGroupOperationDto> {
    const projectGroupOperation =
      await this.projectGroupOperationService.deleteProjectGroupOperation({
        id: Number(id),
      });
    return toProjectGroupOperationDto(projectGroupOperation);
  }
}
