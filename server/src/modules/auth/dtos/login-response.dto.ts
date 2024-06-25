import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
