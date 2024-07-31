import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { ApiBody, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from '../user/user.service';
import { toUserResponseDto } from '../user/utils/toUserResponseDto';
import { UserResponseDto } from '../user/dtos';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    type: LoginResponseDto,
  })
  async login(
    @Request() req: Request & { user: User },
  ): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      oneOf: [
        { $ref: getSchemaPath(LoginResponseDto) },
        { $ref: getSchemaPath(UserResponseDto) },
      ],
    },
  })
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<LoginResponseDto | UserResponseDto> {
    const user = await this.userService.createUserWithPassword({
      name: registerDto.username,
      password: registerDto.password,
    });

    if (registerDto.autoLogin) {
      return this.authService.login({
        name: user.name,
        id: user.id,
      });
    }
    return toUserResponseDto(user);
  }
}
