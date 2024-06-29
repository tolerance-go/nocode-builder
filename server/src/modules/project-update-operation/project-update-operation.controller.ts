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
// import { ProjectUpdateOperationCreateDto } from './dtos/project-update-operation-create.dto';
import { ProjectUpdateOperationQueryDto } from './dtos/project-update-operation-query.dto';
import { ProjectUpdateOperationUpdateDto } from './dtos/project-update-operation-update.dto';
import { ProjectUpdateOperationDto } from './dtos/project-update-operation.dto';
import { ProjectUpdateOperationService } from './project-update-operation.service';
import { toProjectUpdateOperationDto } from './utils/toProjectUpdateOperationDto';

@Controller('project-groups')
export class ProjectUpdateOperationController {
  constructor(
    private readonly projectUpdateOperationService: ProjectUpdateOperationService,
  ) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully fetched.',
    type: ProjectUpdateOperationDto,
  })
  async getProjectUpdateOperation(
    @Param('id') id: string,
  ): Promise<ProjectUpdateOperationDto | null> {
    const projectUpdateOperation =
      await this.projectUpdateOperationService.projectUpdateOperation({
        id: Number(id),
      });
    return projectUpdateOperation
      ? toProjectUpdateOperationDto(projectUpdateOperation)
      : null;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The project groups have been successfully fetched.',
    type: [ProjectUpdateOperationDto],
  })
  async getProjectUpdateOperations(
    @Query() query: ProjectUpdateOperationQueryDto,
  ): Promise<ProjectUpdateOperationDto[]> {
    const projectUpdateOperations =
      await this.projectUpdateOperationService.projectUpdateOperations({
        skip: query.skip,
        take: query.take,
        cursor: query.filter ? { id: Number(query.filter) } : undefined,
        orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
      });
    return projectUpdateOperations.map(toProjectUpdateOperationDto);
  }

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiResponse({
  //   status: 201,
  //   description: 'The project group has been successfully created.',
  //   type: ProjectUpdateOperationDto,
  // })
  // @ApiResponse({ status: 400, description: 'Bad Request.' })
  // async createProjectUpdateOperation(
  //   @Body() data: ProjectUpdateOperationCreateDto,
  //   @Req() req: Request & { user: JwtUserDto },
  // ): Promise<ProjectUpdateOperationDto> {
  //   const { ...rest } = data;
  //   const userId = req.user.id;
  //   const projectUpdateOperation =
  //     await this.projectUpdateOperationService.createProjectUpdateOperation(
  //       {
  //         ...rest,
  //         owner: {
  //           connect: {
  //             id: userId,
  //           },
  //         },
  //       },
  //     );
  //   return toProjectUpdateOperationDto(projectUpdateOperation);
  // }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully updated.',
    type: ProjectUpdateOperationDto,
  })
  async updateProjectUpdateOperation(
    @Param('id') id: string,
    @Body() data: ProjectUpdateOperationUpdateDto,
  ): Promise<ProjectUpdateOperationDto> {
    const projectUpdateOperation =
      await this.projectUpdateOperationService.updateProjectUpdateOperation({
        where: { id: Number(id) },
        data,
      });
    return toProjectUpdateOperationDto(projectUpdateOperation);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully deleted.',
    type: ProjectUpdateOperationDto,
  })
  async deleteProjectUpdateOperation(
    @Param('id') id: string,
  ): Promise<ProjectUpdateOperationDto> {
    const projectUpdateOperation =
      await this.projectUpdateOperationService.deleteProjectUpdateOperation({
        id: Number(id),
      });
    return toProjectUpdateOperationDto(projectUpdateOperation);
  }
}
