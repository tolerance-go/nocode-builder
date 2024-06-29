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
// import { ProjectOperationCreateDto } from './dtos/project-operation-create.dto';
import { ProjectOperationQueryDto } from './dtos/project-operation-query.dto';
import { ProjectOperationUpdateDto } from './dtos/project-operation-update.dto';
import { ProjectOperationDto } from './dtos/project-operation.dto';
import { ProjectOperationService } from './project-operation.service';
import { toProjectOperationDto } from './utils/toProjectOperationDto';

@Controller('project-groups')
export class ProjectOperationController {
  constructor(
    private readonly projectOperationService: ProjectOperationService,
  ) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully fetched.',
    type: ProjectOperationDto,
  })
  async getProjectOperation(
    @Param('id') id: string,
  ): Promise<ProjectOperationDto | null> {
    const projectOperation =
      await this.projectOperationService.projectOperation({
        id: Number(id),
      });
    return projectOperation ? toProjectOperationDto(projectOperation) : null;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The project groups have been successfully fetched.',
    type: [ProjectOperationDto],
  })
  async getProjectOperations(
    @Query() query: ProjectOperationQueryDto,
  ): Promise<ProjectOperationDto[]> {
    const projectOperations =
      await this.projectOperationService.projectOperations({
        skip: query.skip,
        take: query.take,
        cursor: query.filter ? { id: Number(query.filter) } : undefined,
        orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
      });
    return projectOperations.map(toProjectOperationDto);
  }

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiResponse({
  //   status: 201,
  //   description: 'The project group has been successfully created.',
  //   type: ProjectOperationDto,
  // })
  // @ApiResponse({ status: 400, description: 'Bad Request.' })
  // async createProjectOperation(
  //   @Body() data: ProjectOperationCreateDto,
  //   @Req() req: Request & { user: JwtUserDto },
  // ): Promise<ProjectOperationDto> {
  //   const { ...rest } = data;
  //   const userId = req.user.id;
  //   const projectOperation =
  //     await this.projectOperationService.createProjectOperation(
  //       {
  //         ...rest,
  //         owner: {
  //           connect: {
  //             id: userId,
  //           },
  //         },
  //       },
  //     );
  //   return toProjectOperationDto(projectOperation);
  // }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully updated.',
    type: ProjectOperationDto,
  })
  async updateProjectOperation(
    @Param('id') id: string,
    @Body() data: ProjectOperationUpdateDto,
  ): Promise<ProjectOperationDto> {
    const projectOperation =
      await this.projectOperationService.updateProjectOperation({
        where: { id: Number(id) },
        data,
      });
    return toProjectOperationDto(projectOperation);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully deleted.',
    type: ProjectOperationDto,
  })
  async deleteProjectOperation(
    @Param('id') id: string,
  ): Promise<ProjectOperationDto> {
    const projectOperation =
      await this.projectOperationService.deleteProjectOperation({
        id: Number(id),
      });
    return toProjectOperationDto(projectOperation);
  }
}
