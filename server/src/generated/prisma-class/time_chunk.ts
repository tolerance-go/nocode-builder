import { User } from './user';
import { TimeNode } from './time_node';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TimeChunk {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ isArray: true, type: () => TimeNode })
  timeNodes: TimeNode[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
