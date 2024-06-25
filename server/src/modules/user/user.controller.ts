import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserQueryDto } from './dtos/user-query.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully fetched.',
    type: UserDto,
  })
  async getUser(@Param('id') id: string): Promise<UserDto | null> {
    return this.userService.user({ id: Number(id) });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully fetched.',
    type: [UserDto],
  })
  async getUsers(@Query() query: UserQueryDto): Promise<UserDto[]> {
    return this.userService.users({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
  }

  @Post()
  @ApiBody({ type: UserCreateDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Body() data: UserCreateDto): Promise<UserDto> {
    return this.userService.createUser(data);
  }

  @Patch(':id')
  @ApiBody({ type: UserUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserDto,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() data: UserUpdateDto,
  ): Promise<UserDto> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: UserDto,
  })
  async deleteUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
