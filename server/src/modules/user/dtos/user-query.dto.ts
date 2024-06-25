import { ApiProperty } from '@nestjs/swagger';

export class UserQueryDto {
  @ApiProperty({ required: false })
  skip?: number;

  @ApiProperty({ required: false })
  take?: number;

  @ApiProperty({ required: false })
  orderBy?: string;

  @ApiProperty({ required: false })
  filter?: string;
}
