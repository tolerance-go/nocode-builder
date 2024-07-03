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
import { UserResponseDto } from './dtos/user-response.dto';
import { UserService } from './user.service';
import { toUserResponseDto } from './utils/toUserResponseDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully fetched.',
    type: UserResponseDto,
  })
  async getUser(@Param('id') id: string): Promise<UserResponseDto | null> {
    const user = await this.userService.user({ id: Number(id) });
    return user ? toUserResponseDto(user) : null;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully fetched.',
    type: [UserResponseDto],
  })
  async getUsers(@Query() query: UserQueryDto): Promise<UserResponseDto[]> {
    const users = await this.userService.users({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return users.map(toUserResponseDto);
  }

  @Post()
  @ApiBody({ type: UserCreateDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Body() data: UserCreateDto): Promise<UserResponseDto> {
    const user = await this.userService.createUserWithPassword(data);
    return toUserResponseDto(user);
  }

  @Patch(':id')
  @ApiBody({ type: UserUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserResponseDto,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() data: UserUpdateDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.updateUser({
      where: { id: Number(id) },
      data,
    });
    return toUserResponseDto(user);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: UserResponseDto,
  })
  async deleteUser(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.deleteUser({ id: Number(id) });
    return toUserResponseDto(user);
  }
}
