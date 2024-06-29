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
// import { ProjectCreateOperationCreateDto } from './dtos/project-create-operation-create.dto';
import { ProjectCreateOperationQueryDto } from './dtos/project-create-operation-query.dto';
import { ProjectCreateOperationUpdateDto } from './dtos/project-create-operation-update.dto';
import { ProjectCreateOperationDto } from './dtos/project-create-operation.dto';
import { ProjectCreateOperationService } from './project-create-operation.service';
import { toProjectCreateOperationDto } from './utils/toProjectCreateOperationDto';

@Controller('project-groups')
export class ProjectCreateOperationController {
  constructor(
    private readonly projectCreateOperationService: ProjectCreateOperationService,
  ) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully fetched.',
    type: ProjectCreateOperationDto,
  })
  async getProjectCreateOperation(
    @Param('id') id: string,
  ): Promise<ProjectCreateOperationDto | null> {
    const projectCreateOperation =
      await this.projectCreateOperationService.projectCreateOperation({
        id: Number(id),
      });
    return projectCreateOperation
      ? toProjectCreateOperationDto(projectCreateOperation)
      : null;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The project groups have been successfully fetched.',
    type: [ProjectCreateOperationDto],
  })
  async getProjectCreateOperations(
    @Query() query: ProjectCreateOperationQueryDto,
  ): Promise<ProjectCreateOperationDto[]> {
    const projectCreateOperations =
      await this.projectCreateOperationService.projectCreateOperations({
        skip: query.skip,
        take: query.take,
        cursor: query.filter ? { id: Number(query.filter) } : undefined,
        orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
      });
    return projectCreateOperations.map(toProjectCreateOperationDto);
  }

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiResponse({
  //   status: 201,
  //   description: 'The project group has been successfully created.',
  //   type: ProjectCreateOperationDto,
  // })
  // @ApiResponse({ status: 400, description: 'Bad Request.' })
  // async createProjectCreateOperation(
  //   @Body() data: ProjectCreateOperationCreateDto,
  //   @Req() req: Request & { user: JwtUserDto },
  // ): Promise<ProjectCreateOperationDto> {
  //   const { ...rest } = data;
  //   const userId = req.user.id;
  //   const projectCreateOperation =
  //     await this.projectCreateOperationService.createProjectCreateOperation(
  //       {
  //         ...rest,
  //         owner: {
  //           connect: {
  //             id: userId,
  //           },
  //         },
  //       },
  //     );
  //   return toProjectCreateOperationDto(projectCreateOperation);
  // }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully updated.',
    type: ProjectCreateOperationDto,
  })
  async updateProjectCreateOperation(
    @Param('id') id: string,
    @Body() data: ProjectCreateOperationUpdateDto,
  ): Promise<ProjectCreateOperationDto> {
    const projectCreateOperation =
      await this.projectCreateOperationService.updateProjectCreateOperation({
        where: { id: Number(id) },
        data,
      });
    return toProjectCreateOperationDto(projectCreateOperation);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully deleted.',
    type: ProjectCreateOperationDto,
  })
  async deleteProjectCreateOperation(
    @Param('id') id: string,
  ): Promise<ProjectCreateOperationDto> {
    const projectCreateOperation =
      await this.projectCreateOperationService.deleteProjectCreateOperation({
        id: Number(id),
      });
    return toProjectCreateOperationDto(projectCreateOperation);
  }
}
