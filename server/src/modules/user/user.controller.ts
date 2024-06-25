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
import bcrypt from 'bcrypt';
import { toUserDto } from './utils/toUserDto';

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
    const user = await this.userService.user({ id: Number(id) });
    return user ? toUserDto(user) : null;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully fetched.',
    type: [UserDto],
  })
  async getUsers(@Query() query: UserQueryDto): Promise<UserDto[]> {
    const users = await this.userService.users({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return users.map(toUserDto);
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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newData = { ...data, password: hashedPassword };
    const user = await this.userService.createUser(newData);
    return toUserDto(user);
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
    const user = await this.userService.updateUser({
      where: { id: Number(id) },
      data,
    });
    return toUserDto(user);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: UserDto,
  })
  async deleteUser(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.deleteUser({ id: Number(id) });
    return toUserDto(user);
  }
}
