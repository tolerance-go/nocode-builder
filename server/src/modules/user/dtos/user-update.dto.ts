import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  Length,
  IsDateString,
} from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'johndoe@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'The password for the user',
    example: 'P@ssw0rd!',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(6, 20)
  password?: string;

  @ApiProperty({
    description: 'The last update date of the user record',
    example: '2024-01-02T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
