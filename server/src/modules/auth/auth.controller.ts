import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
