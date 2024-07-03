import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginResponseDto } from './dtos/login-response.dto';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.user({
      name: username,
    });
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('密码错误');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async login(user: Pick<User, 'name' | 'id'>): Promise<LoginResponseDto> {
    const payload: JwtPayloadDto = { username: user.name, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
