import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    required: false,
    nullable: true,
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string | null;

  @ApiProperty({
    description: 'The date and time when the user was created',
    example: '2024-01-01T00:00:00Z',
  })
  @IsDateString()
  createdAt: string;

  @ApiProperty({
    description: 'The date and time when the user was last updated',
    example: '2024-01-02T00:00:00Z',
  })
  @IsDateString()
  updatedAt: string;
}
