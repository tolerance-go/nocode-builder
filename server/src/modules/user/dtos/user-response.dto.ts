import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({})
  id: number;

  @ApiProperty({})
  name: string;

  @ApiProperty({
    required: false,
  })
  email?: string;

  @ApiProperty({})
  createdAt: string;

  @ApiProperty({})
  updatedAt: string;
}
