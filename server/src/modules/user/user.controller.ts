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
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { toUserResponseDto } from './utils/toUserResponseDto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtUserDto } from '../auth/dtos/jwt-user.dto';
import {
  UserResponseDto,
  UserQueryDto,
  UserCreateDto,
  UserUpdateDto,
} from './dtos';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getUserByToken')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully fetched.',
    type: UserResponseDto,
  })
  async getUserByToken(
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<UserResponseDto | null> {
    const userId = req.user.id;
    const user = await this.userService.user({ id: userId });
    return user ? toUserResponseDto(user) : null;
  }

  @Get('detail/:id')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
